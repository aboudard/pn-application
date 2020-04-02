import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MetaVieComponentsPage, MetaVieDeleteDialog, MetaVieUpdatePage } from './meta-vie.page-object';

const expect = chai.expect;

describe('MetaVie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metaVieComponentsPage: MetaVieComponentsPage;
  let metaVieUpdatePage: MetaVieUpdatePage;
  let metaVieDeleteDialog: MetaVieDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MetaVies', async () => {
    await navBarPage.goToEntity('meta-vie');
    metaVieComponentsPage = new MetaVieComponentsPage();
    await browser.wait(ec.visibilityOf(metaVieComponentsPage.title), 5000);
    expect(await metaVieComponentsPage.getTitle()).to.eq('pnApplicationApp.metaVie.home.title');
    await browser.wait(ec.or(ec.visibilityOf(metaVieComponentsPage.entities), ec.visibilityOf(metaVieComponentsPage.noResult)), 1000);
  });

  it('should load create MetaVie page', async () => {
    await metaVieComponentsPage.clickOnCreateButton();
    metaVieUpdatePage = new MetaVieUpdatePage();
    expect(await metaVieUpdatePage.getPageTitle()).to.eq('pnApplicationApp.metaVie.home.createOrEditLabel');
    await metaVieUpdatePage.cancel();
  });

  it('should create and save MetaVies', async () => {
    const nbButtonsBeforeCreate = await metaVieComponentsPage.countDeleteButtons();

    await metaVieComponentsPage.clickOnCreateButton();

    await promise.all([
      metaVieUpdatePage.setIdTechInput('5'),
      metaVieUpdatePage.setNumSousInput('numSous'),
      metaVieUpdatePage.setNumContratVieInput('numContratVie'),
      metaVieUpdatePage.idTechSelectLastOption()
    ]);

    expect(await metaVieUpdatePage.getIdTechInput()).to.eq('5', 'Expected idTech value to be equals to 5');
    expect(await metaVieUpdatePage.getNumSousInput()).to.eq('numSous', 'Expected NumSous value to be equals to numSous');
    expect(await metaVieUpdatePage.getNumContratVieInput()).to.eq(
      'numContratVie',
      'Expected NumContratVie value to be equals to numContratVie'
    );

    await metaVieUpdatePage.save();
    expect(await metaVieUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await metaVieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MetaVie', async () => {
    const nbButtonsBeforeDelete = await metaVieComponentsPage.countDeleteButtons();
    await metaVieComponentsPage.clickOnLastDeleteButton();

    metaVieDeleteDialog = new MetaVieDeleteDialog();
    expect(await metaVieDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.metaVie.delete.question');
    await metaVieDeleteDialog.clickOnConfirmButton();

    expect(await metaVieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
