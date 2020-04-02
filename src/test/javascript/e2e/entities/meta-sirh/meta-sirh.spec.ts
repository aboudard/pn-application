import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MetaSIRHComponentsPage, MetaSIRHDeleteDialog, MetaSIRHUpdatePage } from './meta-sirh.page-object';

const expect = chai.expect;

describe('MetaSIRH e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metaSIRHComponentsPage: MetaSIRHComponentsPage;
  let metaSIRHUpdatePage: MetaSIRHUpdatePage;
  let metaSIRHDeleteDialog: MetaSIRHDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MetaSIRHS', async () => {
    await navBarPage.goToEntity('meta-sirh');
    metaSIRHComponentsPage = new MetaSIRHComponentsPage();
    await browser.wait(ec.visibilityOf(metaSIRHComponentsPage.title), 5000);
    expect(await metaSIRHComponentsPage.getTitle()).to.eq('pnApplicationApp.metaSIRH.home.title');
    await browser.wait(ec.or(ec.visibilityOf(metaSIRHComponentsPage.entities), ec.visibilityOf(metaSIRHComponentsPage.noResult)), 1000);
  });

  it('should load create MetaSIRH page', async () => {
    await metaSIRHComponentsPage.clickOnCreateButton();
    metaSIRHUpdatePage = new MetaSIRHUpdatePage();
    expect(await metaSIRHUpdatePage.getPageTitle()).to.eq('pnApplicationApp.metaSIRH.home.createOrEditLabel');
    await metaSIRHUpdatePage.cancel();
  });

  it('should create and save MetaSIRHS', async () => {
    const nbButtonsBeforeCreate = await metaSIRHComponentsPage.countDeleteButtons();

    await metaSIRHComponentsPage.clickOnCreateButton();

    await promise.all([
      metaSIRHUpdatePage.setIdTechInput('5'),
      metaSIRHUpdatePage.setNumBadgeInput('numBadge'),
      metaSIRHUpdatePage.setNumBadgeDestInput('numBadgeDest'),
      metaSIRHUpdatePage.setNomCollabInput('nomCollab'),
      metaSIRHUpdatePage.setPrenomCollabInput('prenomCollab'),
      metaSIRHUpdatePage.setCodeUOInput('codeUO'),
      metaSIRHUpdatePage.idTechSelectLastOption()
    ]);

    expect(await metaSIRHUpdatePage.getIdTechInput()).to.eq('5', 'Expected idTech value to be equals to 5');
    expect(await metaSIRHUpdatePage.getNumBadgeInput()).to.eq('numBadge', 'Expected NumBadge value to be equals to numBadge');
    expect(await metaSIRHUpdatePage.getNumBadgeDestInput()).to.eq(
      'numBadgeDest',
      'Expected NumBadgeDest value to be equals to numBadgeDest'
    );
    expect(await metaSIRHUpdatePage.getNomCollabInput()).to.eq('nomCollab', 'Expected NomCollab value to be equals to nomCollab');
    expect(await metaSIRHUpdatePage.getPrenomCollabInput()).to.eq(
      'prenomCollab',
      'Expected PrenomCollab value to be equals to prenomCollab'
    );
    expect(await metaSIRHUpdatePage.getCodeUOInput()).to.eq('codeUO', 'Expected CodeUO value to be equals to codeUO');

    await metaSIRHUpdatePage.save();
    expect(await metaSIRHUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await metaSIRHComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MetaSIRH', async () => {
    const nbButtonsBeforeDelete = await metaSIRHComponentsPage.countDeleteButtons();
    await metaSIRHComponentsPage.clickOnLastDeleteButton();

    metaSIRHDeleteDialog = new MetaSIRHDeleteDialog();
    expect(await metaSIRHDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.metaSIRH.delete.question');
    await metaSIRHDeleteDialog.clickOnConfirmButton();

    expect(await metaSIRHComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
