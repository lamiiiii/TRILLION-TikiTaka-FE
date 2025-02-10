import {useMutation, useQueryClient} from '@tanstack/react-query';

export const QUERY_KEY = {
  TICKET_DETAILS: 'ticketDetails',
  MANAGERS: 'managers',
  TYPES: 'types',
  CATEGORIES: 'categories',
};
export const useCreateMutation = <T>(mutationFn: (arg: T) => Promise<any>, errorMessage: string, ticketId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEY.TICKET_DETAILS, ticketId]});
    },
    onError: () => {
      alert(errorMessage);
    },
  });
};
