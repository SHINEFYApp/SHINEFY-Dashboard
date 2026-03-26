import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ManageServiceBoy from '../ManageServiceBoy';
import * as hooks from '../../../api/features/serviceBoys.hooks';
import { toast } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the hooks
vi.mock('../../../api/features/serviceBoys.hooks', () => ({
    useGetServiceBoys: vi.fn(),
    useDeleteServiceBoy: vi.fn(),
    useUpdateServiceBoyStatus: vi.fn(),
    useExportServiceBoys: vi.fn(),
    useSetServiceBoyTemporaryOff: vi.fn(),
}));

// Mock Sonner toast
vi.mock('sonner', () => ({
    toast: vi.fn(),
}));

// Mock react-router components to avoid context issues
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual as any,
        Link: ({ to, children, ...props }: any) => <a href={to} {...props}>{children}</a>,
        MemoryRouter: ({ children }: any) => <div>{children}</div>,
    };
});

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual as any,
        Link: ({ to, children, ...props }: any) => <a href={to} {...props}>{children}</a>,
    };
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const mockData = {
    data: {
        data: {
            data: [
                {
                    user_id: 1,
                    name: 'Test Boy',
                    phone_number_display: '123-456-7890',
                    registered_at: '2026-03-25',
                    active_flag: 1,
                    image_url: '',
                }
            ],
            pagination: {
                total_items: 1,
                total_pages: 1,
            }
        }
    }
};

describe('ManageServiceBoy UI Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (hooks.useGetServiceBoys as any).mockReturnValue({ data: mockData, isLoading: false });
        (hooks.useDeleteServiceBoy as any).mockReturnValue({ mutate: vi.fn() });
        (hooks.useUpdateServiceBoyStatus as any).mockReturnValue({ mutate: vi.fn() });
        (hooks.useSetServiceBoyTemporaryOff as any).mockReturnValue({ mutate: vi.fn() });
        (hooks.useExportServiceBoys as any).mockReturnValue({ mutate: vi.fn() });
    });

    const renderPage = () => render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <ManageServiceBoy />
            </MemoryRouter>
        </QueryClientProvider>
    );

    it('Scenario 1: should have an "Add Service Boy" link', () => {
        renderPage();
        const addButton = screen.getByText(/Add Service Boy/i);
        expect(addButton.closest('a')).toHaveAttribute('href', '/users&staff/manage/serviceBoy/addServiceBoy');
    });

    it('Scenario 2: should have an "update" link for each service boy', () => {
        renderPage();
        const updateLink = screen.getByText(/update/i);
        expect(updateLink.closest('a')).toHaveAttribute('href', '/users&staff/manage/serviceBoy/edit/1');
    });

    it('Scenario 3: should trigger deactivation confirm toast', async () => {
        renderPage();
        const deactivateButton = screen.getByRole('button', { name: /Deactivate/i });
        fireEvent.click(deactivateButton);
        
        expect(toast).toHaveBeenCalledWith(expect.stringContaining('deactivate'), expect.any(Object));
    });

    it('Scenario 4: should open "Off Time" modal and trigger mutation on confirm', async () => {
        const offTimeMutation = { mutate: vi.fn() };
        (hooks.useSetServiceBoyTemporaryOff as any).mockReturnValue(offTimeMutation);
        
        renderPage();
        const offTimeButton = screen.getByRole('button', { name: /^Off Time$/i });
        fireEvent.click(offTimeButton);

        expect(screen.getByText(/Set Temporary Off Time/i)).toBeInTheDocument();

        const fromInput = screen.getByLabelText(/Date & Time From/i);
        const toInput = screen.getByLabelText(/Date & Time To/i);
        const confirmButton = screen.getByRole('button', { name: /Confirm Off Time/i });

        fireEvent.change(fromInput, { target: { value: '2026-04-01T10:00' } });
        fireEvent.change(toInput, { target: { value: '2026-04-05T18:00' } });
        fireEvent.click(confirmButton);

        expect(offTimeMutation.mutate).toHaveBeenCalledWith({
            id: 1,
            data: {
                date_from: '2026-04-01 10:00:00',
                date_to: '2026-04-05 18:00:00',
            }
        });
    });

    it('Scenario 5: should trigger activation confirm toast when deactivated', async () => {
        const deactivatedMock = JSON.parse(JSON.stringify(mockData));
        deactivatedMock.data.data.data[0].active_flag = 0;
        (hooks.useGetServiceBoys as any).mockReturnValue({ data: deactivatedMock, isLoading: false });

        renderPage();
        const activateButton = screen.getByRole('button', { name: /Activate/i });
        fireEvent.click(activateButton);
        
        expect(toast).toHaveBeenCalledWith(expect.stringContaining('activate'), expect.any(Object));
    });

    it('Scenario 6: should trigger delete confirm toast', async () => {
        renderPage();
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);
        
        expect(toast).toHaveBeenCalledWith(expect.stringContaining('delete'), expect.any(Object));
    });
});
