export class CreatePackageDto {
    name: string;
    package_type: number;
    point: number;
    family_group: number;
    circle_group: number;
    family_group_member: number;
    circle_group_member: number;
    wywtm_member: number;
    family_group_total_tracking: number;
    circle_group_total_tracking: number;
    wywtm_total_tracking: number;
  }
  
  export class UpdatePackageDto {
    name?: string;
    package_type?: number;
    point?: number;
    family_group?: number;
    circle_group?: number;
    family_group_member?: number;
    circle_group_member?: number;
    wywtm_member?: number;
    family_group_total_tracking?: number;
    circle_group_total_tracking?: number;
    wywtm_total_tracking?: number;
  }
  