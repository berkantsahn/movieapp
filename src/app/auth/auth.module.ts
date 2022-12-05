import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";

const routes:Routes = [
    { path: 'login', component: AuthComponent }
];

@NgModule({
    declarations: [AuthComponent],
    imports: [
        FormsModule, 
        RouterModule.forChild(routes)],
    exports: [AuthComponent]
})
export class AuthModule {}