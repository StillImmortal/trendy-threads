import { Store } from "@/db/schema"
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"

import { getUserStores } from "@/app/_actions/store"

export const useGetUSerStores = (userId: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["userStores"],
    queryFn: async () => await getUserStores(userId),
    ...options,
  }) as UseQueryResult<Store[]>
}
