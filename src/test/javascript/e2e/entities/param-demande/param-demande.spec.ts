import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParamDemandeComponentsPage, ParamDemandeDeleteDialog, ParamDemandeUpdatePage } from './param-demande.page-object';

const expect = chai.expect;

describe('ParamDemande e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let paramDemandeComponentsPage: ParamDemandeComponentsPage;
  let paramDemandeUpdatePage: ParamDemandeUpdatePage;
  let paramDemandeDeleteDialog: ParamDemandeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ParamDemandes', async () => {
    await navBarPage.goToEntity('param-demande');
    paramDemandeComponentsPage = new ParamDemandeComponentsPage();
    await browser.wait(ec.visibilityOf(paramDemandeComponentsPage.title), 5000);
    expect(await paramDemandeComponentsPage.getTitle()).to.eq('pnApplicationApp.paramDemande.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(paramDemandeComponentsPage.entities), ec.visibilityOf(paramDemandeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ParamDemande page', async () => {
    await paramDemandeComponentsPage.clickOnCreateButton();
    paramDemandeUpdatePage = new ParamDemandeUpdatePage();
    expect(await paramDemandeUpdatePage.getPageTitle()).to.eq('pnApplicationApp.paramDemande.home.createOrEditLabel');
    await paramDemandeUpdatePage.cancel();
  });

  it('should create and save ParamDemandes', async () => {
    const nbButtonsBeforeCreate = await paramDemandeComponentsPage.countDeleteButtons();

    await paramDemandeComponentsPage.clickOnCreateButton();

    await promise.all([
      paramDemandeUpdatePage.setIdDemandeInput('idDemande'),
      paramDemandeUpdatePage.setFgcleInput('5'),
      paramDemandeUpdatePage.setNomDataLoaderInput('5'),
      paramDemandeUpdatePage.setVersionDataLoaderInput('versionDataLoader'),
      paramDemandeUpdatePage.setNomModeleInput('5'),
      paramDemandeUpdatePage.setIdModeleInput('5'),
      paramDemandeUpdatePage.setVersionModeleInput('versionModele'),
      paramDemandeUpdatePage.setImpressionInput('impression'),
      paramDemandeUpdatePage.setArchivageInput('archivage'),
      paramDemandeUpdatePage.setInteractiveInput('interactive'),
      paramDemandeUpdatePage.setStockageInput('stockage'),
      paramDemandeUpdatePage.setHostColInput('hostCol'),
      paramDemandeUpdatePage.setImpCentrInput('impCentr'),
      paramDemandeUpdatePage.setInstColInput('instCol'),
      paramDemandeUpdatePage.setImpHCentrInput('impHCentr'),
      paramDemandeUpdatePage.setLotContInput('lotCont'),
      paramDemandeUpdatePage.setDestInput('dest'),
      paramDemandeUpdatePage.setTriRegrouptBannInput('triRegrouptBann'),
      paramDemandeUpdatePage.setReglesInput('5'),
      paramDemandeUpdatePage.setConditionnementInput('conditionnement'),
      paramDemandeUpdatePage.setPeriodiciteInput('periodicite'),
      paramDemandeUpdatePage.setFlagMailInput('flagMail'),
      paramDemandeUpdatePage.setDescriptionInput('description'),
      paramDemandeUpdatePage.setVersionMoInput('5'),
      paramDemandeUpdatePage.setQueuesEaiInInput('queuesEaiIn'),
      paramDemandeUpdatePage.setQueuesEaiOutInput('queuesEaiOut'),
      paramDemandeUpdatePage.setLibre2Input('5'),
      paramDemandeUpdatePage.setLibre4Input('5')
    ]);

    expect(await paramDemandeUpdatePage.getIdDemandeInput()).to.eq('idDemande', 'Expected IdDemande value to be equals to idDemande');
    expect(await paramDemandeUpdatePage.getFgcleInput()).to.eq('5', 'Expected fgcle value to be equals to 5');
    expect(await paramDemandeUpdatePage.getNomDataLoaderInput()).to.eq('5', 'Expected nomDataLoader value to be equals to 5');
    expect(await paramDemandeUpdatePage.getVersionDataLoaderInput()).to.eq(
      'versionDataLoader',
      'Expected VersionDataLoader value to be equals to versionDataLoader'
    );
    expect(await paramDemandeUpdatePage.getNomModeleInput()).to.eq('5', 'Expected nomModele value to be equals to 5');
    expect(await paramDemandeUpdatePage.getIdModeleInput()).to.eq('5', 'Expected idModele value to be equals to 5');
    expect(await paramDemandeUpdatePage.getVersionModeleInput()).to.eq(
      'versionModele',
      'Expected VersionModele value to be equals to versionModele'
    );
    expect(await paramDemandeUpdatePage.getImpressionInput()).to.eq('impression', 'Expected Impression value to be equals to impression');
    expect(await paramDemandeUpdatePage.getArchivageInput()).to.eq('archivage', 'Expected Archivage value to be equals to archivage');
    expect(await paramDemandeUpdatePage.getInteractiveInput()).to.eq(
      'interactive',
      'Expected Interactive value to be equals to interactive'
    );
    expect(await paramDemandeUpdatePage.getStockageInput()).to.eq('stockage', 'Expected Stockage value to be equals to stockage');
    expect(await paramDemandeUpdatePage.getHostColInput()).to.eq('hostCol', 'Expected HostCol value to be equals to hostCol');
    expect(await paramDemandeUpdatePage.getImpCentrInput()).to.eq('impCentr', 'Expected ImpCentr value to be equals to impCentr');
    expect(await paramDemandeUpdatePage.getInstColInput()).to.eq('instCol', 'Expected InstCol value to be equals to instCol');
    expect(await paramDemandeUpdatePage.getImpHCentrInput()).to.eq('impHCentr', 'Expected ImpHCentr value to be equals to impHCentr');
    expect(await paramDemandeUpdatePage.getLotContInput()).to.eq('lotCont', 'Expected LotCont value to be equals to lotCont');
    expect(await paramDemandeUpdatePage.getDestInput()).to.eq('dest', 'Expected Dest value to be equals to dest');
    expect(await paramDemandeUpdatePage.getTriRegrouptBannInput()).to.eq(
      'triRegrouptBann',
      'Expected TriRegrouptBann value to be equals to triRegrouptBann'
    );
    expect(await paramDemandeUpdatePage.getReglesInput()).to.eq('5', 'Expected regles value to be equals to 5');
    expect(await paramDemandeUpdatePage.getConditionnementInput()).to.eq(
      'conditionnement',
      'Expected Conditionnement value to be equals to conditionnement'
    );
    expect(await paramDemandeUpdatePage.getPeriodiciteInput()).to.eq(
      'periodicite',
      'Expected Periodicite value to be equals to periodicite'
    );
    expect(await paramDemandeUpdatePage.getFlagMailInput()).to.eq('flagMail', 'Expected FlagMail value to be equals to flagMail');
    expect(await paramDemandeUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await paramDemandeUpdatePage.getVersionMoInput()).to.eq('5', 'Expected versionMo value to be equals to 5');
    expect(await paramDemandeUpdatePage.getQueuesEaiInInput()).to.eq(
      'queuesEaiIn',
      'Expected QueuesEaiIn value to be equals to queuesEaiIn'
    );
    expect(await paramDemandeUpdatePage.getQueuesEaiOutInput()).to.eq(
      'queuesEaiOut',
      'Expected QueuesEaiOut value to be equals to queuesEaiOut'
    );
    expect(await paramDemandeUpdatePage.getLibre2Input()).to.eq('5', 'Expected libre2 value to be equals to 5');
    expect(await paramDemandeUpdatePage.getLibre4Input()).to.eq('5', 'Expected libre4 value to be equals to 5');

    await paramDemandeUpdatePage.save();
    expect(await paramDemandeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await paramDemandeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ParamDemande', async () => {
    const nbButtonsBeforeDelete = await paramDemandeComponentsPage.countDeleteButtons();
    await paramDemandeComponentsPage.clickOnLastDeleteButton();

    paramDemandeDeleteDialog = new ParamDemandeDeleteDialog();
    expect(await paramDemandeDeleteDialog.getDialogTitle()).to.eq('pnApplicationApp.paramDemande.delete.question');
    await paramDemandeDeleteDialog.clickOnConfirmButton();

    expect(await paramDemandeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
