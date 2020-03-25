import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AuditComponentsPage, AuditDeleteDialog, AuditUpdatePage } from './audit.page-object';

const expect = chai.expect;

describe('Audit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let auditComponentsPage: AuditComponentsPage;
  let auditUpdatePage: AuditUpdatePage;
  let auditDeleteDialog: AuditDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Audits', async () => {
    await navBarPage.goToEntity('audit');
    auditComponentsPage = new AuditComponentsPage();
    await browser.wait(ec.visibilityOf(auditComponentsPage.title), 5000);
    expect(await auditComponentsPage.getTitle()).to.eq('pnApplicationApp.audit.home.title');
    await browser.wait(ec.or(ec.visibilityOf(auditComponentsPage.entities), ec.visibilityOf(auditComponentsPage.noResult)), 1000);
  });

  it('should load create Audit page', async () => {
    await auditComponentsPage.clickOnCreateButton();
    auditUpdatePage = new AuditUpdatePage();
    expect(await auditUpdatePage.getPageTitle()).to.eq('pnApplicationApp.audit.home.createOrEditLabel');
    await auditUpdatePage.cancel();
  });

  it('should create and save Audits', async () => {
    const nbButtonsBeforeCreate = await auditComponentsPage.countDeleteButtons();

    await auditComponentsPage.clickOnCreateButton();

    await promise.all([
      auditUpdatePage.setIdEditionInput('5'),
      auditUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      auditUpdatePage.setBadgeInput('badge'),
      auditUpdatePage.actionSelectLastOption()
    ]);

    expect(await auditUpdatePage.getIdEditionInput()).to.eq('5', 'Expected idEdition value to be equals to 5');
    expect(await auditUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await auditUpdatePage.getBadgeInput()).to.eq('badge', 'Expected Badge value to be equals to badge');

    await auditUpdatePage.save();
    expect(await auditUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await auditComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Audit', async () => {
    const nbButtonsBeforeDelete = await auditComponentsPage.countDeleteButtons();
    await auditComponentsPage.clickOnLastDeleteButton();

    auditDeleteDialog = new AuditDeleteDialog();
    expect(await auditDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.audit.delete.question');
    await auditDeleteDialog.clickOnConfirmButton();

    expect(await auditComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
