import type { IncomingHttpHeaders } from "node:http";
import { describe, expect, it, vi } from "vitest";

import type { EventTypeRepository } from "@calcom/features/eventtypes/repositories/eventTypeRepository";
import type { FeaturesRepository } from "@calcom/features/flags/features.repository";

import { BotDetectionService } from "./BotDetectionService";

// REVREX Phase 5: Vercel BotID is disabled on this deployment. BotDetectionService
// is a no-op; the original behavioural tests against `botid/server` were removed
// together with the package. Cloudflare Worker (Turnstile / WAF) handles bot
// mitigation, so any future tests belong against that layer instead.
describe("BotDetectionService (REVREX no-op)", () => {
  const mockFeaturesRepository = {
    checkIfTeamHasFeature: vi.fn(),
  } as unknown as FeaturesRepository;

  const mockEventTypeRepository = {
    getTeamIdByEventTypeId: vi.fn(),
  } as unknown as EventTypeRepository;

  const mockHeaders: IncomingHttpHeaders = { "user-agent": "test" };

  it("resolves without calling any dependency", async () => {
    const service = new BotDetectionService(mockFeaturesRepository, mockEventTypeRepository);

    await expect(
      service.checkBotDetection({ eventTypeId: 1, headers: mockHeaders })
    ).resolves.toBeUndefined();

    expect(mockFeaturesRepository.checkIfTeamHasFeature).not.toHaveBeenCalled();
    expect(mockEventTypeRepository.getTeamIdByEventTypeId).not.toHaveBeenCalled();
  });
});
