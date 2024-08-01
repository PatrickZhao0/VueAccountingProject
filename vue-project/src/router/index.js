import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import KeepAccounts from '@/pages/KeepAccounts.vue'
import Index from '@/pages/Index.vue'
import Doc_Acc from '@/pages/Doc/Doc_Acc.vue'
import Doc_DocRecycleBin from '@/pages/Doc/Doc_DocRecycleBin.vue'
import Doc_List from '@/pages/Doc/Doc_List.vue'
import Doc_TempList from '@/pages/Doc/Doc_TempList.vue'
import Doc_VoucherCover from '@/pages/Doc/Doc_VoucherCover.vue'
import Doc from '@/pages/Doc.vue'
import Setting_Subject from '@/pages/Setting/Setting_Subject.vue'
import Setting_AccountAccounting from '@/pages/Setting/Setting_AccountAccounting.vue'
import Setting from '@/pages/Setting.vue'
import Report from '@/pages/Report.vue'
import Report_Debt from '@/pages/Report/Report_Debt.vue'
import Report_IncomeStatement from '@/pages/Report/Report_IncomeStatement.vue'
import Report_CashFlow from '@/pages/Report/Report_CashFlow.vue'
// import Voucher from '@/pages/Voucher.vue'
// import EditVoucher from '@/pages/Voucher/EditVoucher.vue'
// import Income from '@/pages/Bill/Income.vue'
// import Draft from '@/pages/Bill/Draft.vue'
// import Fund from '@/pages/Bill/Fund.vue'
// import Bill from '@/pages/Bill.vue'
// import Invoice from '@/pages/Bill/Invoice.vue'
// import Salary from '@/pages/Bill/Salary.vue'
// import Sales from '@/pages/Bill/Sales.vue'
// import RetrieveVoucher from '@/pages/Voucher/RetrieveVoucher.vue'
// import VoucherCover from '@/pages/Voucher/VoucherCover.vue'
// import VoucherTemplate from '@/pages/Voucher/VoucherTemplate.vue'
// import VoucherTrash from '@/pages/Voucher/VoucherTrash.vue'
// import AccountBook from '@/pages/AccountBook.vue'
// import AccountBalance from '@/pages/AccountBook/AccountBalance.vue'
// import CashJournal from '@/pages/AccountBook/CashJournal.vue'
// import DepositJournal from '@/pages/AccountBook/DepositJournal.vue'
// import GeneralLedger from '@/pages/AccountBook/GeneralLedger.vue'
// import InventoryGeneral from '@/pages/AccountBook/InventoryGeneral.vue'
// import InventorySubsidiary from '@/pages/AccountBook/InventorySubsidiary.vue'
// import QAGeneral from '@/pages/AccountBook/QAGeneral.vue'
// import QASubsidiary from '@/pages/AccountBook/QASubsidiary.vue'
// import SaleGeneral from '@/pages/AccountBook/SaleGeneral.vue'
// import SaleSubsidiary from '@/pages/AccountBook/SaleSubsidiary.vue'
// import SubsidiaryLedger from '@/pages/AccountBook/SubsidiaryLedger.vue'
// import Asset from '@/pages/Asset.vue'
// import Card from '@/pages/Asset/Card.vue'
// import Categories from '@/pages/Asset/Categories.vue'
// import DepreciationChart from '@/pages/Asset/DepreciationChart.vue'
// import DisposalChart from '@/pages/Asset/DisposalChart.vue'
// import Finance from '@/pages/Finance.vue'
// import Costing from '@/pages/Finance/Costing.vue'
// import CarryForward from '@/pages/Finance/CarryForward.vue'
// import RiskDetect from '@/pages/Finance/RiskDetect.vue'
// import BalanceSheet from '@/pages/Report/BalanceSheet.vue'
// import CashFlowStatement from '@/pages/Report/CashFlowStatement.vue'
// import IncomeStatement from '@/pages/Report/IncomeStatement.vue'
// import TaxLedger from '@/pages/Report/TaxLedger.vue'
// import Setting from '@/pages/Setting.vue'
// import AccAndOpeningBalance from '@/pages/Setting/AccAndOpeningBalance.vue'
// import Accounting from '@/pages/Setting/Accounting.vue'
// import BatchDocking from '@/pages/Setting/BatchDocking.vue'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },

    {
      path: '/keepAccounts',
      component: KeepAccounts
    },

    {
      path: '/index',
      component: Index,
    },

    { 
      path: '/doc', 
      component: Doc,
      redirect: '/doc/acc',
      children: [
        { 
          path: 'acc', 
          component: Doc_Acc 
        },

        { 
          path: 'list', 
          component: Doc_List 
        },

        { 
          path: 'tempList', 
          component: Doc_TempList 
        },

        { 
          path: 'voucherCover', 
          component: Doc_VoucherCover 
        },

        { 
          path: 'docRecycleBin', 
          component: Doc_DocRecycleBin 
        }
      ]
    },

    {
      path: '/setting', 
      component: Setting, 
      redirect: '/setting/subject',
      children: [
        { 
          path: 'subject', 
          component: Setting_Subject
        }, 

        { 
          path: 'accountAccounting', 
          component: Setting_AccountAccounting 
        }
      ]
    },

    {
      path: '/report',
      component: Report,
      redirect: '/report/debt',
      children: [
        {
          path: 'debt',
          component: Report_Debt
        },
        {
          path: 'incomeStatement',
          component: Report_IncomeStatement
        },
        {
          path: 'CashFlow',
          component: Report_CashFlow
        }
      ]
    }
    // {
    //   path: '/bill', 
    //   component: Bill, 
    //   redirect: '/bill/fund',
    //   children: [
    //     { 
    //       path: 'fund', 
    //       component: Fund 
    //     }, 

    //     { 
    //       path: 'draft', 
    //       component: Draft 
    //     }, 

    //     { 
    //       path: 'income', 
    //       component: Income 
    //     },

    //     { 
    //       path: 'invoice', 
    //       component: Invoice 
    //     },

    //     { 
    //       path: 'salary', 
    //       component: Salary 
    //     },

    //     { 
    //       path: 'Sales', 
    //       component: Sales 
    //     }

    //   ]
    // },

    // {
    //   path: '/accountBook', 
    //   component: AccountBook, 
    //   redirect: '/accountBook/accountBalance',
    //   children: [
    //     { 
    //       path: 'accountBalance', 
    //       component: AccountBalance
    //     }, 

    //     { 
    //       path: 'cashJournal', 
    //       component: CashJournal 
    //     }, 

    //     { 
    //       path: 'depositJournal', 
    //       component: DepositJournal 
    //     },

    //     { 
    //       path: 'generalLedger', 
    //       component: GeneralLedger 
    //     },

    //     { 
    //       path: 'inventoryGeneral', 
    //       component: InventoryGeneral 
    //     },

    //     { 
    //       path: 'inventorySubsidiary', 
    //       component: InventorySubsidiary 
    //     },

    //     { 
    //       path: 'QAGeneral', 
    //       component: QAGeneral 
    //     },

    //     { 
    //       path: 'QASubsidiary', 
    //       component: QASubsidiary 
    //     },

    //     { 
    //       path: 'saleGeneral', 
    //       component: SaleGeneral 
    //     },

    //     { 
    //       path: 'saleSubsidiary', 
    //       component: SaleSubsidiary 
    //     },

    //     { 
    //       path: 'subsidiaryLedger', 
    //       component: SubsidiaryLedger 
    //     }

    //   ]
    // },

    // {
    //   path: '/asset', 
    //   component: Asset, 
    //   redirect: '/asset/card',
    //   children: [
    //     { 
    //       path: 'card', 
    //       component: Card 
    //     }, 

    //     { 
    //       path: 'categories', 
    //       component: Categories 
    //     }, 

    //     { 
    //       path: 'depreciation', 
    //       component: DepreciationChart
    //     },

    //     { 
    //       path: 'diposal', 
    //       component: DisposalChart 
    //     }

    //   ]
    // },

    // {
    //   path: '/finance', 
    //   component: Finance, 
    //   redirect: '/finance/costing',
    //   children: [
    //     { 
    //       path: 'costing', 
    //       component: Costing 
    //     }, 

    //     { 
    //       path: 'carryForward', 
    //       component: CarryForward 
    //     }, 

    //     { 
    //       path: 'riskDetect', 
    //       component: RiskDetect
    //     }

    //   ]
    // },

    // {
    //   path: '/report', 
    //   component: Report, 
    //   redirect: '/report/balanceSheet',
    //   children: [
    //     { 
    //       path: 'balanceSheet', 
    //       component: BalanceSheet 
    //     }, 

    //     { 
    //       path: 'cashFlowStatement', 
    //       component: CashFlowStatement 
    //     }, 

    //     { 
    //       path: 'incomeStatement', 
    //       component: IncomeStatement
    //     },

    //     { 
    //       path: 'taxLedger', 
    //       component: TaxLedger 
    //     }
        
    //   ]
    // },


  ]
})

router.beforeEach(async (to, from) => {
  console.log(to.path);
  if (localStorage.getItem("token") == undefined && to.path !== '/login') {
    console.log('asdfasdfasdfasdfasdfasd');
    // location.href="http://localhost:5173/login"
    return {path: '/login'}
  }
  console.log("sd")
  if(to.path === '/login') {
    window.$updateNoToken();
    localStorage.clear();
    return;
  }
  window.$updateNoToken(false);
  if(to.path === '/keepAccounts') {
    window.$updateNoCustomerId();
    localStorage.removeItem('customerId');
  } else {
    if(localStorage.getItem('customerId')) {
      window.$updateNoCustomerId(false);
    } else {
      return { path: '/keepAccounts'} 
    }
  }
})

export default router
