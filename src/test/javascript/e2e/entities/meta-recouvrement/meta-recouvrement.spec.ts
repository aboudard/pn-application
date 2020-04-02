import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MetaRecouvrementComponentsPage, MetaRecouvrementDeleteDialog, MetaRecouvrementUpdatePage } from './meta-recouvrement.page-object';

const expect = chai.expect;

describe('MetaRecouvrement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metaRecouvrementComponentsPage: MetaRecouvrementComponentsPage;
  let metaRecouvrementUpdatePage: MetaRecouvrementUpdatePage;
  let metaRecouvrementDeleteDialog: MetaRecouvrementDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MetaRecouvrements', async () => {
    await navBarPage.goToEntity('meta-recouvrement');
    metaRecouvrementComponentsPage = new MetaRecouvrementComponentsPage();
    await browser.wait(ec.visibilityOf(metaRecouvrementComponentsPage.title), 5000);
    expect(await metaRecouvrementComponentsPage.getTitle()).to.eq('pnApplicationApp.metaRecouvrement.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(metaRecouvrementComponentsPage.entities), ec.visibilityOf(metaRecouvrementComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MetaRecouvrement page', async () => {
    await metaRecouvrementComponentsPage.clickOnCreateButton();
    metaRecouvrementUpdatePage = new MetaRecouvrementUpdatePage();
    expect(await metaRecouvrementUpdatePage.getPageTitle()).to.eq('pnApplicationApp.metaRecouvrement.home.createOrEditLabel');
    await metaRecouvrementUpdatePage.cancel();
  });

  it('should create and save MetaRecouvrements', async () => {
    const nbButtonsBeforeCreate = await metaRecouvrementComponentsPage.countDeleteButtons();

    await metaRecouvrementComponentsPage.clickOnCreateButton();

    await promise.all([
      metaRecouvrementUpdatePage.setIdTechInput('5'),
      metaRecouvrementUpdatePage.setSocieteInput('societe'),
      metaRecouvrementUpdatePage.setNumSousInput('numSous'),
      metaRecouvrementUpdatePage.idTechSelectLastOption()
    ]);

    expect(await metaRecouvrementUpdatePage.getIdTechInput()).to.eq('5', 'Expected idTech value to be equals to 5');
    expect(await metaRecouvrementUpdatePage.getSocieteInput()).to.eq('societe', 'Expected Societe value to be equals to societe');
    expect(await metaRecouvrementUpdatePage.getNumSousInput()).to.eq('numSous', 'Expected NumSous value to be equals to numSous');

    await metaRecouvrementUpdatePage.save();
    expect(await metaRecouvrementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await metaRecouvrementComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MetaRecouvrement', async () => {
    const nbButtonsBeforeDelete = await metaRecouvrementComponentsPage.countDeleteButtons();
    await metaRecouvrementComponentsPage.clickOnLastDeleteButton();

    metaRecouvrementDeleteDialog = new MetaRecouvrementDeleteDialog();
    expect(await metaRecouvrementDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.metaRecouvrement.delete.question');
    await metaRecouvrementDeleteDialog.clickOnConfirmButton();

    expect(await metaRecouvrementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
