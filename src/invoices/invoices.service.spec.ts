import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { InvoicesService } from "./invoices.service.js";

describe("InvoicesService", () => {
    const invoicesRepository = { create: vi.fn(), findById: vi.fn(), update: vi.fn() };
    const engagementsRepository = { findById: vi.fn() };
    let service: InvoicesService;

    const engagement = {
        id: "e1",
        hourlyRate: new Prisma.Decimal("45.5"),
        commissionRate: new Prisma.Decimal("0.1525")
    };

    const dto = {
        engagementId: "e1",
        periodStart: new Date("2026-09-01"),
        periodEnd: new Date("2026-09-30"),
        hoursWorked: 10
    };

    beforeEach(() => {
        vi.resetAllMocks();
        service = new InvoicesService(invoicesRepository as any, engagementsRepository as any);
    });

    describe("create", () => {
        it("calculates gross, commission and net", async () => {
            engagementsRepository.findById.mockResolvedValue(engagement);

            await service.create(dto);

            const data = invoicesRepository.create.mock.calls[0][0];
            expect(data.grossAmount.toString()).toBe("455");
            expect(data.commissionAmount.toString()).toBe("69.39");
            expect(data.netAmount.toString()).toBe("385.61");
        });

        it("rounds gross and commission to 2 decimals", async () => {
            engagementsRepository.findById.mockResolvedValue(engagement);

            await service.create({ ...dto, hoursWorked: 3.33 });

            const data = invoicesRepository.create.mock.calls[0][0];
            expect(data.grossAmount.toString()).toBe("151.52");
            expect(data.commissionAmount.toString()).toBe("23.11");
            expect(data.netAmount.toString()).toBe("128.41");
        });

        it("snapshots the engagement rates without truncating", async () => {
            engagementsRepository.findById.mockResolvedValue(engagement);

            await service.create(dto);

            const data = invoicesRepository.create.mock.calls[0][0];
            expect(data.invoicedHourlyRate.toString()).toBe("45.5");
            expect(data.invoicedCommissionRate.toString()).toBe("0.1525");
        });

        it("throws NotFound when the engagement does not exist", async () => {
            engagementsRepository.findById.mockResolvedValue(null);

            await expect(service.create(dto)).rejects.toThrow(NotFoundException);
            expect(invoicesRepository.create).not.toHaveBeenCalled();
        });

        it("throws BadRequest when the period ends before it starts", async () => {
            engagementsRepository.findById.mockResolvedValue(engagement);

            await expect(
                service.create({ ...dto, periodStart: new Date("2026-09-30"), periodEnd: new Date("2026-09-01") })
            ).rejects.toThrow(BadRequestException);
        });
    });

    describe("update", () => {
        const invoice = {
            id: "i1",
            periodStart: new Date("2026-09-01"),
            periodEnd: new Date("2026-09-30"),
            hoursWorked: new Prisma.Decimal(10),
            invoicedHourlyRate: new Prisma.Decimal("45.5"),
            invoicedCommissionRate: new Prisma.Decimal("0.1525")
        };

        it("recalculates with the invoice snapshot, not the current engagement", async () => {
            invoicesRepository.findById.mockResolvedValue(invoice);

            await service.update("i1", { hoursWorked: 20 });

            const data = invoicesRepository.update.mock.calls[0][1];
            expect(data.grossAmount.toString()).toBe("910");
            expect(data.commissionAmount.toString()).toBe("138.78");
            expect(data.netAmount.toString()).toBe("771.22");
            expect(engagementsRepository.findById).not.toHaveBeenCalled();
        });

        it("throws NotFound when the invoice does not exist", async () => {
            invoicesRepository.findById.mockResolvedValue(null);

            await expect(service.update("x", { hoursWorked: 5 })).rejects.toThrow(NotFoundException);
        });
    });
});