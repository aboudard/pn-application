import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MetaCoherisComponentsPage, MetaCoherisDeleteDialog, MetaCoherisUpdatePage } from './meta-coheris.page-object';

const expect = chai.expect;

describe('MetaCoheris e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metaCoherisComponentsPage: MetaCoherisComponentsPage;
  let metaCoherisUpdatePage: MetaCoherisUpdatePage;
  let metaCoherisDeleteDialog: MetaCoherisDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MetaCoherises', async () => {
    await navBarPage.goToEntity('meta-coheris');
    metaCoherisComponentsPage = new MetaCoherisComponentsPage();
    await browser.wait(ec.visibilityOf(metaCoherisComponentsPage.title), 5000);
    expect(await metaCoherisComponentsPage.getTitle()).to.eq('pnApplicationApp.metaCoheris.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(metaCoherisComponentsPage.entities), ec.visibilityOf(metaCoherisComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MetaCoheris page', async () => {
    await metaCoherisComponentsPage.clickOnCreateButton();
    metaCoherisUpdatePage = new MetaCoherisUpdatePage();
    expect(await metaCoherisUpdatePage.getPageTitle()).to.eq('pnApplicationApp.metaCoheris.home.createOrEditLabel');
    await metaCoherisUpdatePage.cancel();
  });

  it('should create and save MetaCoherises', async () => {
    const nbButtonsBeforeCreate = await metaCoherisComponentsPage.countDeleteButtons();

    await metaCoherisComponentsPage.clickOnCreateButton();

    await promise.all([
      metaCoherisUpdatePage.setIdTechInput('5'),
      metaCoherisUpdatePage.setSocieteInput('societe'),
      metaCoherisUpdatePage.setNumSousInput('numSous'),
      metaCoherisUpdatePage.setNumGRCInput('numGRC'),
      metaCoherisUpdatePage.idTechSelectLastOption()
    ]);

    expect(await metaCoherisUpdatePage.getIdTechInput()).to.eq('5', 'Expected idTech value to be equals to 5');
    expect(await metaCoherisUpdatePage.getSocieteInput()).to.eq('societe', 'Expected Societe value to be equals to societe');
    expect(await metaCoherisUpdatePage.getNumSousInput()).to.eq('numSous', 'Expected NumSous value to be equals to numSous');
    expect(await metaCoherisUpdatePage.getNumGRCInput()).to.eq('numGRC', 'Expected NumGRC value to be equals to numGRC');

    await metaCoherisUpdatePage.save();
    expect(await metaCoherisUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await metaCoherisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MetaCoheris', async () => {
    const nbButtonsBeforeDelete = await metaCoherisComponentsPage.countDeleteButtons();
    await metaCoherisComponentsPage.clickOnLastDeleteButton();

    metaCoherisDeleteDialog = new MetaCoherisDeleteDialog();
    expect(await metaCoherisDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.metaCoheris.delete.question');
    await metaCoherisDeleteDialog.clickOnConfirmButton();

    expect(await metaCoherisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
