import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MetaSelMedComponentsPage, MetaSelMedDeleteDialog, MetaSelMedUpdatePage } from './meta-sel-med.page-object';

const expect = chai.expect;

describe('MetaSelMed e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metaSelMedComponentsPage: MetaSelMedComponentsPage;
  let metaSelMedUpdatePage: MetaSelMedUpdatePage;
  let metaSelMedDeleteDialog: MetaSelMedDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MetaSelMeds', async () => {
    await navBarPage.goToEntity('meta-sel-med');
    metaSelMedComponentsPage = new MetaSelMedComponentsPage();
    await browser.wait(ec.visibilityOf(metaSelMedComponentsPage.title), 5000);
    expect(await metaSelMedComponentsPage.getTitle()).to.eq('pnApplicationApp.metaSelMed.home.title');
    await browser.wait(ec.or(ec.visibilityOf(metaSelMedComponentsPage.entities), ec.visibilityOf(metaSelMedComponentsPage.noResult)), 1000);
  });

  it('should load create MetaSelMed page', async () => {
    await metaSelMedComponentsPage.clickOnCreateButton();
    metaSelMedUpdatePage = new MetaSelMedUpdatePage();
    expect(await metaSelMedUpdatePage.getPageTitle()).to.eq('pnApplicationApp.metaSelMed.home.createOrEditLabel');
    await metaSelMedUpdatePage.cancel();
  });

  it('should create and save MetaSelMeds', async () => {
    const nbButtonsBeforeCreate = await metaSelMedComponentsPage.countDeleteButtons();

    await metaSelMedComponentsPage.clickOnCreateButton();

    await promise.all([
      metaSelMedUpdatePage.setIdTechInput('5'),
      metaSelMedUpdatePage.setNumSousInput('numSous'),
      metaSelMedUpdatePage.setNumDossierInput('numDossier'),
      metaSelMedUpdatePage.setNomAssureInput('nomAssure'),
      metaSelMedUpdatePage.idTechSelectLastOption()
    ]);

    expect(await metaSelMedUpdatePage.getIdTechInput()).to.eq('5', 'Expected idTech value to be equals to 5');
    expect(await metaSelMedUpdatePage.getNumSousInput()).to.eq('numSous', 'Expected NumSous value to be equals to numSous');
    expect(await metaSelMedUpdatePage.getNumDossierInput()).to.eq('numDossier', 'Expected NumDossier value to be equals to numDossier');
    expect(await metaSelMedUpdatePage.getNomAssureInput()).to.eq('nomAssure', 'Expected NomAssure value to be equals to nomAssure');

    await metaSelMedUpdatePage.save();
    expect(await metaSelMedUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await metaSelMedComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MetaSelMed', async () => {
    const nbButtonsBeforeDelete = await metaSelMedComponentsPage.countDeleteButtons();
    await metaSelMedComponentsPage.clickOnLastDeleteButton();

    metaSelMedDeleteDialog = new MetaSelMedDeleteDialog();
    expect(await metaSelMedDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.metaSelMed.delete.question');
    await metaSelMedDeleteDialog.clickOnConfirmButton();

    expect(await metaSelMedComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
