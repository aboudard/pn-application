import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DemandeComponentsPage, DemandeDeleteDialog, DemandeUpdatePage } from './demande.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Demande e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let demandeComponentsPage: DemandeComponentsPage;
  let demandeUpdatePage: DemandeUpdatePage;
  let demandeDeleteDialog: DemandeDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Demandes', async () => {
    await navBarPage.goToEntity('demande');
    demandeComponentsPage = new DemandeComponentsPage();
    await browser.wait(ec.visibilityOf(demandeComponentsPage.title), 5000);
    expect(await demandeComponentsPage.getTitle()).to.eq('pnApplicationApp.demande.home.title');
    await browser.wait(ec.or(ec.visibilityOf(demandeComponentsPage.entities), ec.visibilityOf(demandeComponentsPage.noResult)), 1000);
  });

  it('should load create Demande page', async () => {
    await demandeComponentsPage.clickOnCreateButton();
    demandeUpdatePage = new DemandeUpdatePage();
    expect(await demandeUpdatePage.getPageTitle()).to.eq('pnApplicationApp.demande.home.createOrEditLabel');
    await demandeUpdatePage.cancel();
  });

  it('should create and save Demandes', async () => {
    const nbButtonsBeforeCreate = await demandeComponentsPage.countDeleteButtons();

    await demandeComponentsPage.clickOnCreateButton();

    await promise.all([
      demandeUpdatePage.setIdTechInput('5'),
      demandeUpdatePage.setDomaineInput('domaine'),
      demandeUpdatePage.setIdDemandeInput('idDemande'),
      demandeUpdatePage.setBadgeInput('badge'),
      demandeUpdatePage.setDateDemandeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      demandeUpdatePage.statutSelectLastOption(),
      demandeUpdatePage.setFluxInput(absolutePath)
    ]);

    expect(await demandeUpdatePage.getIdTechInput()).to.eq('5', 'Expected idTech value to be equals to 5');
    expect(await demandeUpdatePage.getDomaineInput()).to.eq('domaine', 'Expected Domaine value to be equals to domaine');
    expect(await demandeUpdatePage.getIdDemandeInput()).to.eq('idDemande', 'Expected IdDemande value to be equals to idDemande');
    expect(await demandeUpdatePage.getBadgeInput()).to.eq('badge', 'Expected Badge value to be equals to badge');
    expect(await demandeUpdatePage.getDateDemandeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDemande value to be equals to 2000-12-31'
    );
    expect(await demandeUpdatePage.getFluxInput()).to.endsWith(fileNameToUpload, 'Expected Flux value to be end with ' + fileNameToUpload);

    await demandeUpdatePage.save();
    expect(await demandeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await demandeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Demande', async () => {
    const nbButtonsBeforeDelete = await demandeComponentsPage.countDeleteButtons();
    await demandeComponentsPage.clickOnLastDeleteButton();

    demandeDeleteDialog = new DemandeDeleteDialog();
    expect(await demandeDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.demande.delete.question');
    await demandeDeleteDialog.clickOnConfirmButton();

    expect(await demandeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
