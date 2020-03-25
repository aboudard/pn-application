import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DocFluxComponentsPage, DocFluxDeleteDialog, DocFluxUpdatePage } from './doc-flux.page-object';

const expect = chai.expect;

describe('DocFlux e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let docFluxComponentsPage: DocFluxComponentsPage;
  let docFluxUpdatePage: DocFluxUpdatePage;
  let docFluxDeleteDialog: DocFluxDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DocFluxes', async () => {
    await navBarPage.goToEntity('doc-flux');
    docFluxComponentsPage = new DocFluxComponentsPage();
    await browser.wait(ec.visibilityOf(docFluxComponentsPage.title), 5000);
    expect(await docFluxComponentsPage.getTitle()).to.eq('pnApplicationApp.docFlux.home.title');
    await browser.wait(ec.or(ec.visibilityOf(docFluxComponentsPage.entities), ec.visibilityOf(docFluxComponentsPage.noResult)), 1000);
  });

  it('should load create DocFlux page', async () => {
    await docFluxComponentsPage.clickOnCreateButton();
    docFluxUpdatePage = new DocFluxUpdatePage();
    expect(await docFluxUpdatePage.getPageTitle()).to.eq('pnApplicationApp.docFlux.home.createOrEditLabel');
    await docFluxUpdatePage.cancel();
  });

  it('should create and save DocFluxes', async () => {
    const nbButtonsBeforeCreate = await docFluxComponentsPage.countDeleteButtons();

    await docFluxComponentsPage.clickOnCreateButton();

    await promise.all([
      docFluxUpdatePage.setIdEditionInput('idEdition'),
      docFluxUpdatePage.setLibelleInput('libelle'),
      docFluxUpdatePage.setModeleInput('modele'),
      docFluxUpdatePage.setFamilleInput('famille'),
      docFluxUpdatePage.setVersionInput('version')
      // docFluxUpdatePage.idEditionSelectLastOption(),
    ]);

    expect(await docFluxUpdatePage.getIdEditionInput()).to.eq('idEdition', 'Expected IdEdition value to be equals to idEdition');
    expect(await docFluxUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
    expect(await docFluxUpdatePage.getModeleInput()).to.eq('modele', 'Expected Modele value to be equals to modele');
    expect(await docFluxUpdatePage.getFamilleInput()).to.eq('famille', 'Expected Famille value to be equals to famille');
    expect(await docFluxUpdatePage.getVersionInput()).to.eq('version', 'Expected Version value to be equals to version');

    await docFluxUpdatePage.save();
    expect(await docFluxUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await docFluxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last DocFlux', async () => {
    const nbButtonsBeforeDelete = await docFluxComponentsPage.countDeleteButtons();
    await docFluxComponentsPage.clickOnLastDeleteButton();

    docFluxDeleteDialog = new DocFluxDeleteDialog();
    expect(await docFluxDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.docFlux.delete.question');
    await docFluxDeleteDialog.clickOnConfirmButton();

    expect(await docFluxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
