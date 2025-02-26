import { Company } from "../company/company.model";
import { Product } from "../product/product.model";
import { Role } from "../role/role.model";
import { Settings } from "../settings/settings.models";

export interface SessionState {
    products?: Product[];
    companies?: Company[];
    settings?: Settings;
    userRole?: Role;
}
