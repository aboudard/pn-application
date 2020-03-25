import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MetaProductionComponentsPage, MetaProductionDeleteDialog, MetaProductionUpdatePage } from './meta-production.page-object';

const expect = chai.expect;

describe('MetaProduction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metaProductionComponentsPage: MetaProductionComponentsPage;
  let metaProductionUpdatePage: MetaProductionUpdatePage;
  let metaProductionDeleteDialog: MetaProductionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MetaProductions', async () => {
    await navBarPage.goToEntity('meta-production');
    metaProductionComponentsPage = new MetaProductionComponentsPage();
    await browser.wait(ec.visibilityOf(metaProductionComponentsPage.title), 5000);
    expect(await metaProductionComponentsPage.getTitle()).to.eq('pnApplicationApp.metaProduction.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(metaProductionComponentsPage.entities), ec.visibilityOf(metaProductionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MetaProduction page', async () => {
    await metaProductionComponentsPage.clickOnCreateButton();
    metaProductionUpdatePage = new MetaProductionUpdatePage();
    expect(await metaProductionUpdatePage.getPageTitle()).to.eq('pnApplicationApp.metaProduction.home.createOrEditLabel');
    await metaProductionUpdatePage.cancel();
  });

  it('should create and save MetaProductions', async () => {
    const nbButtonsBeforeCreate = await metaProductionComponentsPage.countDeleteButtons();

    await metaProductionComponentsPage.clickOnCreateButton();

    await promise.all([
      metaProductionUpdatePage.setIdTechInput('5'),
      metaProductionUpdatePage.setSocieteInput('societe'),
      metaProductionUpdatePage.setNumContratLgbtInput('numContratLgbt'),
      metaProductionUpdatePage.setNumSousInput('numSous'),
      metaProductionUpdatePage.idTechSelectLastOption()
    ]);

    expect(await metaProductionUpdatePage.getIdTechInput()).to.eq('5', 'Expected idTech value to be equals to 5');
    expect(await metaProductionUpdatePage.getSocieteInput()).to.eq('societe', 'Expected Societe value to be equals to societe');
    expect(await metaProductionUpdatePage.getNumContratLgbtInput()).to.eq(
      'numContratLgbt',
      'Expected NumContratLgbt value to be equals to numContratLgbt'
    );
    expect(await metaProductionUpdatePage.getNumSousInput()).to.eq('numSous', 'Expected NumSous value to be equals to numSous');

    await metaProductionUpdatePage.save();
    expect(await metaProductionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await metaProductionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MetaProduction', async () => {
    const nbButtonsBeforeDelete = await metaProductionComponentsPage.countDeleteButtons();
    await metaProductionComponentsPage.clickOnLastDeleteButton();

    metaProductionDeleteDialog = new MetaProductionDeleteDialog();
    expect(await metaProductionDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.metaProduction.delete.question');
    await metaProductionDeleteDialog.clickOnConfirmButton();

    expect(await metaProductionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
