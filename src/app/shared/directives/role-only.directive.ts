import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RoleService } from '@core/role/role.service';
import { Role } from '@core/role/role.model';

@Directive({
  selector: '[appRoleOnly]'
})
export class RoleOnlyDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private roleService: RoleService
  ) {}

  @Input() set appRoleOnly(requiredRole: string) {
    if (this.roleService.role === requiredRole as Role) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
