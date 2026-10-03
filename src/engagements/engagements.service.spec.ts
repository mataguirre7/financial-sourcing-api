import { BadRequestException, NotFoundException } from "@nestjs/common";
import { EngagementStatus } from "@prisma/client";
import { EngagementsService } from "./engagements.service.js";

describe("EngagementsService.create (validateEngagement)", () => {
    const engagementsRepository = { create: vi.fn() };
    const clientsRepository = { findById: vi.fn() };
    const contractorsRepository = { findById: vi.fn() };
    let service: EngagementsService;

    const dto = {
        clientId: "c1",
        contractorId: "k1",
        hourlyRate: 45.5,
        commissionRate: 0.1525,
        startDate: new Date("2026-09-01")
    };

    beforeEach(() => {
        vi.resetAllMocks();
        clientsRepository.findById.mockResolvedValue({ id: "c1" });
        contractorsRepository.findById.mockResolvedValue({ id: "k1" });
        service = new EngagementsService(
            engagementsRepository as any,
            clientsRepository as any,
            contractorsRepository as any);
    });

    it("creates an active engagement with a null endDate by default", async () => {
        await service.create(dto);

        expect(engagementsRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({ status: EngagementStatus.active, endDate: null })
        );
    });

    it("throws NotFound when the client does not exist", async () => {
        clientsRepository.findById.mockResolvedValue(null);

        await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it("throws NotFound when the contractor does not exist", async () => {
        contractorsRepository.findById.mockResolvedValue(null);

        await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it.each([0, -10])("rejects hourly rate %s", async (hourlyRate) => {
        await expect(service.create({ ...dto, hourlyRate })).rejects.toThrow(BadRequestException);
    });

    it.each([-0.1, 1.5])("rejects commission rate %s", async (commissionRate) => {
        await expect(service.create({ ...dto, commissionRate })).rejects.toThrow(BadRequestException);
    });

    it.each([0, 1])("accepts the commission rate boundary %s", async (commissionRate) => {
        await expect(service.create({ ...dto, commissionRate })).resolves.not.toThrow();
    });

    it("rejects an end date before the start date", async () => {
        await expect(
            service.create({ ...dto, endDate: new Date("2026-08-01") })
        ).rejects.toThrow(BadRequestException);
    });
});