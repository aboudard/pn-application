import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MetaReglementComponentsPage, MetaReglementDeleteDialog, MetaReglementUpdatePage } from './meta-reglement.page-object';

const expect = chai.expect;

describe('MetaReglement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metaReglementComponentsPage: MetaReglementComponentsPage;
  let metaReglementUpdatePage: MetaReglementUpdatePage;
  let metaReglementDeleteDialog: MetaReglementDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MetaReglements', async () => {
    await navBarPage.goToEntity('meta-reglement');
    metaReglementComponentsPage = new MetaReglementComponentsPage();
    await browser.wait(ec.visibilityOf(metaReglementComponentsPage.title), 5000);
    expect(await metaReglementComponentsPage.getTitle()).to.eq('pnApplicationApp.metaReglement.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(metaReglementComponentsPage.entities), ec.visibilityOf(metaReglementComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MetaReglement page', async () => {
    await metaReglementComponentsPage.clickOnCreateButton();
    metaReglementUpdatePage = new MetaReglementUpdatePage();
    expect(await metaReglementUpdatePage.getPageTitle()).to.eq('pnApplicationApp.metaReglement.home.createOrEditLabel');
    await metaReglementUpdatePage.cancel();
  });

  it('should create and save MetaReglements', async () => {
    const nbButtonsBeforeCreate = await metaReglementComponentsPage.countDeleteButtons();

    await metaReglementComponentsPage.clickOnCreateButton();

    await promise.all([
      metaReglementUpdatePage.setIdTechInput('5'),
      metaReglementUpdatePage.setSocieteInput('societe'),
      metaReglementUpdatePage.setNumSinistreInput('numSinistre'),
      metaReglementUpdatePage.setNumContratLgbtInput('numContratLgbt'),
      metaReglementUpdatePage.setNumSousInput('numSous'),
      metaReglementUpdatePage.idTechSelectLastOption()
    ]);

    expect(await metaReglementUpdatePage.getIdTechInput()).to.eq('5', 'Expected idTech value to be equals to 5');
    expect(await metaReglementUpdatePage.getSocieteInput()).to.eq('societe', 'Expected Societe value to be equals to societe');
    expect(await metaReglementUpdatePage.getNumSinistreInput()).to.eq(
      'numSinistre',
      'Expected NumSinistre value to be equals to numSinistre'
    );
    expect(await metaReglementUpdatePage.getNumContratLgbtInput()).to.eq(
      'numContratLgbt',
      'Expected NumContratLgbt value to be equals to numContratLgbt'
    );
    expect(await metaReglementUpdatePage.getNumSousInput()).to.eq('numSous', 'Expected NumSous value to be equals to numSous');

    await metaReglementUpdatePage.save();
    expect(await metaReglementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await metaReglementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MetaReglement', async () => {
    const nbButtonsBeforeDelete = await metaReglementComponentsPage.countDeleteButtons();
    await metaReglementComponentsPage.clickOnLastDeleteButton();

    metaReglementDeleteDialog = new MetaReglementDeleteDialog();
    expect(await metaReglementDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.metaReglement.delete.question');
    await metaReglementDeleteDialog.clickOnConfirmButton();

    expect(await metaReglementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
