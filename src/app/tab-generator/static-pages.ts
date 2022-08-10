import { AccountComponent } from '../modules/auth/account/index/index.component';
import { CategoryComponent } from '../modules/auth/category/index/index.component';
import { CustomizeComponent } from '../modules/auth/customize/customize.component';
import { DashboardComponent } from '../modules/auth/dashboard/index/index.component';
import { FinancialMovementComponent } from '../modules/auth/financial-movement/index/index.component';
import { HomeComponent } from '../modules/auth/home/index/index.component';
import { ProfileComponent } from '../modules/auth/profile/form/form.component';

export const STATIC_PAGES = [
    { endpoint: 'customizar', title: 'Customizar', icon: 'bubble_chart', component: CustomizeComponent },
    { endpoint: 'dashboard', title: 'Dashboard', icon: 'insert_chart_outlined', component:  DashboardComponent},
    { endpoint: 'home', title: 'Informações', icon: 'info', component: HomeComponent },
    { endpoint: 'categorias', title: 'Categorias Financeiras', icon: 'category', component: CategoryComponent },
    { endpoint: 'contas', title: 'Contas', icon: 'account_balance_wallet', component: AccountComponent },
    { endpoint: 'perfil', title: 'Perfil', icon: 'account_circle', component: ProfileComponent },
    { endpoint: 'movimentacoes', title: 'Movimentações', icon: 'import_export', component: FinancialMovementComponent },
];








