import { Company } from "../company/company.model";
import { Product } from "../product/product.model";
import { Role } from "../role/role.model";

export interface SessionState {
    products?: Product[];
    companies?: Company[];
    adminConfig?: any;
    userRole?: Role;
}
