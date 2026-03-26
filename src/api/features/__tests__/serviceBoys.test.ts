import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../service/axios';
import {
    getServiceBoys,
    getServiceBoyDetails,
    addServiceBoy,
    updateServiceBoy,
    deleteServiceBoy,
    updateServiceBoyStatus,
    setServiceBoyTemporaryOff,
} from '../serviceBoys';

// Mock the axios instance
vi.mock('../../service/axios', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
        interceptors: {
            request: { use: vi.fn(), eject: vi.fn() },
            response: { use: vi.fn(), eject: vi.fn() },
        },
    },
}));

describe('Service Boy API Scenarios', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // 1-create service boy
    it('Scenario 1: should create a service boy', async () => {
        const payload = {
            name: 'John Doe',
            phone_number: '1234567890',
            address: '123 Main St',
            licence_expiery_date: '2026-12-31',
            available_days: ['Monday', 'Tuesday'],
            start_hour: '09:00',
            end_hour: '17:00',
            latitude: '30.0444',
            longitude: '31.2357',
        };

        (api.post as any).mockResolvedValue({ data: { status: 'success', data: { user_id: 123 } } });

        const response = await addServiceBoy(payload);

        expect(api.post).toHaveBeenCalledWith('/api/service-boys', payload, expect.any(Object));
        expect(response.data.status).toBe('success');
    });

    // 2-update service boy data each one and all
    it('Scenario 2: should update individual and all service boy data', async () => {
        const id = 123;
        const updatePayload = { name: 'John Updated' };
        
        (api.put as any).mockResolvedValue({ data: { status: 'success' } });

        // Update one field
        await updateServiceBoy(id, updatePayload);
        expect(api.put).toHaveBeenCalledWith(`/api/service-boys/${id}`, updatePayload, expect.any(Object));

        // Update all fields (using the same payload type)
        const fullPayload = {
            name: 'John Full Update',
            phone_number: '0987654321',
            address: '456 Elm St',
            licence_expiery_date: '2027-01-01',
            available_days: ['Wednesday'],
            start_hour: '10:00',
            end_hour: '18:00',
            latitude: '31.0',
            longitude: '32.0',
        };
        await updateServiceBoy(id, fullPayload);
        expect(api.put).toHaveBeenCalledWith(`/api/service-boys/${id}`, fullPayload, expect.any(Object));
    });

    // 3-make service boy deactivate
    it('Scenario 3: should deactivate a service boy', async () => {
        const id = 123;
        const payload = { active_flag: 0 };

        (api.patch as any).mockResolvedValue({ data: { status: 'success' } });

        await updateServiceBoyStatus(id, payload);

        expect(api.patch).toHaveBeenCalledWith(`/api/service-boys/${id}/status`, payload, expect.any(Object));
    });

    // 4-make temprory of time
    it('Scenario 4: should set temporary off time for a service boy', async () => {
        const id = 123;
        const payload = {
            date_from: '2026-04-01',
            date_to: '2026-04-05',
        };

        (api.post as any).mockResolvedValue({ data: { status: 'success' } });

        await setServiceBoyTemporaryOff(id, payload);

        expect(api.post).toHaveBeenCalledWith(`/api/service-boys/${id}/temporary-off`, payload, expect.any(Object));
    });

    // 5-make service boy activate
    it('Scenario 5: should activate a service boy', async () => {
        const id = 123;
        const payload = { active_flag: 1 };

        (api.patch as any).mockResolvedValue({ data: { status: 'success' } });

        await updateServiceBoyStatus(id, payload);

        expect(api.patch).toHaveBeenCalledWith(`/api/service-boys/${id}/status`, payload, expect.any(Object));
    });

    // 6-delete service boy created
    it('Scenario 6: should delete a service boy', async () => {
        const id = 123;

        (api.delete as any).mockResolvedValue({ data: { status: 'success' } });

        await deleteServiceBoy(id);

        expect(api.delete).toHaveBeenCalledWith(`/api/service-boys/${id}`, expect.any(Object));
    });
});
