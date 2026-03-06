import { apiGet } from "@/lib/api/client";

export type MaxUiProductTypesResponse = {
  productTypes: string[];
};

export async function getMaxUiProductTypes(): Promise<MaxUiProductTypesResponse> {
  return apiGet<MaxUiProductTypesResponse>("/max-ui/product-types");
}

