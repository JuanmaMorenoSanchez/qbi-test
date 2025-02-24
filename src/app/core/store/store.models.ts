import { Company } from "../company/company.model";
import { Product } from "../product/product.model";

export interface SessionState {
    products?: Product[];
    companies?: Company[];
    adminConfig?: any;
}
