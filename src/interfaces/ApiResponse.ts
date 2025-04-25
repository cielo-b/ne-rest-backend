export interface ApiResponse {
  status: string;
  message?: string;
  success: boolean;
  data?: {};
  token?: string;
  code: number;
}
