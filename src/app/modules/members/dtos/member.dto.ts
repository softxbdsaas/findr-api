export class CreateMemberDto {
    user_id: number;
    group: number;  // ID reference to Group
    status: number;
    added_by: number;
  }
  
  export class UpdateMemberDto {
    user_id?: number;
    group?: number;
    status?: number;
    added_by?: number;
  }
  