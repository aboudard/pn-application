import { element, by, ElementFinder } from 'protractor';

export class ParamDemandeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-param-demande div table .btn-danger'));
  title = element.all(by.css('jhi-param-demande div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ParamDemandeUpdatePage {
  pageTitle = element(by.id('jhi-param-demande-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idDemandeInput = element(by.id('field_idDemande'));
  fgcleInput = element(by.id('field_fgcle'));
  nomDataLoaderInput = element(by.id('field_nomDataLoader'));
  versionDataLoaderInput = element(by.id('field_versionDataLoader'));
  nomModeleInput = element(by.id('field_nomModele'));
  idModeleInput = element(by.id('field_idModele'));
  versionModeleInput = element(by.id('field_versionModele'));
  impressionInput = element(by.id('field_impression'));
  archivageInput = element(by.id('field_archivage'));
  interactiveInput = element(by.id('field_interactive'));
  stockageInput = element(by.id('field_stockage'));
  hostColInput = element(by.id('field_hostCol'));
  impCentrInput = element(by.id('field_impCentr'));
  instColInput = element(by.id('field_instCol'));
  impHCentrInput = element(by.id('field_impHCentr'));
  lotContInput = element(by.id('field_lotCont'));
  destInput = element(by.id('field_dest'));
  triRegrouptBannInput = element(by.id('field_triRegrouptBann'));
  reglesInput = element(by.id('field_regles'));
  conditionnementInput = element(by.id('field_conditionnement'));
  periodiciteInput = element(by.id('field_periodicite'));
  flagMailInput = element(by.id('field_flagMail'));
  descriptionInput = element(by.id('field_description'));
  versionMoInput = element(by.id('field_versionMo'));
  queuesEaiInInput = element(by.id('field_queuesEaiIn'));
  queuesEaiOutInput = element(by.id('field_queuesEaiOut'));
  libre2Input = element(by.id('field_libre2'));
  libre4Input = element(by.id('field_libre4'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdDemandeInput(idDemande: string): Promise<void> {
    await this.idDemandeInput.sendKeys(idDemande);
  }

  async getIdDemandeInput(): Promise<string> {
    return await this.idDemandeInput.getAttribute('value');
  }

  async setFgcleInput(fgcle: string): Promise<void> {
    await this.fgcleInput.sendKeys(fgcle);
  }

  async getFgcleInput(): Promise<string> {
    return await this.fgcleInput.getAttribute('value');
  }

  async setNomDataLoaderInput(nomDataLoader: string): Promise<void> {
    await this.nomDataLoaderInput.sendKeys(nomDataLoader);
  }

  async getNomDataLoaderInput(): Promise<string> {
    return await this.nomDataLoaderInput.getAttribute('value');
  }

  async setVersionDataLoaderInput(versionDataLoader: string): Promise<void> {
    await this.versionDataLoaderInput.sendKeys(versionDataLoader);
  }

  async getVersionDataLoaderInput(): Promise<string> {
    return await this.versionDataLoaderInput.getAttribute('value');
  }

  async setNomModeleInput(nomModele: string): Promise<void> {
    await this.nomModeleInput.sendKeys(nomModele);
  }

  async getNomModeleInput(): Promise<string> {
    return await this.nomModeleInput.getAttribute('value');
  }

  async setIdModeleInput(idModele: string): Promise<void> {
    await this.idModeleInput.sendKeys(idModele);
  }

  async getIdModeleInput(): Promise<string> {
    return await this.idModeleInput.getAttribute('value');
  }

  async setVersionModeleInput(versionModele: string): Promise<void> {
    await this.versionModeleInput.sendKeys(versionModele);
  }

  async getVersionModeleInput(): Promise<string> {
    return await this.versionModeleInput.getAttribute('value');
  }

  async setImpressionInput(impression: string): Promise<void> {
    await this.impressionInput.sendKeys(impression);
  }

  async getImpressionInput(): Promise<string> {
    return await this.impressionInput.getAttribute('value');
  }

  async setArchivageInput(archivage: string): Promise<void> {
    await this.archivageInput.sendKeys(archivage);
  }

  async getArchivageInput(): Promise<string> {
    return await this.archivageInput.getAttribute('value');
  }

  async setInteractiveInput(interactive: string): Promise<void> {
    await this.interactiveInput.sendKeys(interactive);
  }

  async getInteractiveInput(): Promise<string> {
    return await this.interactiveInput.getAttribute('value');
  }

  async setStockageInput(stockage: string): Promise<void> {
    await this.stockageInput.sendKeys(stockage);
  }

  async getStockageInput(): Promise<string> {
    return await this.stockageInput.getAttribute('value');
  }

  async setHostColInput(hostCol: string): Promise<void> {
    await this.hostColInput.sendKeys(hostCol);
  }

  async getHostColInput(): Promise<string> {
    return await this.hostColInput.getAttribute('value');
  }

  async setImpCentrInput(impCentr: string): Promise<void> {
    await this.impCentrInput.sendKeys(impCentr);
  }

  async getImpCentrInput(): Promise<string> {
    return await this.impCentrInput.getAttribute('value');
  }

  async setInstColInput(instCol: string): Promise<void> {
    await this.instColInput.sendKeys(instCol);
  }

  async getInstColInput(): Promise<string> {
    return await this.instColInput.getAttribute('value');
  }

  async setImpHCentrInput(impHCentr: string): Promise<void> {
    await this.impHCentrInput.sendKeys(impHCentr);
  }

  async getImpHCentrInput(): Promise<string> {
    return await this.impHCentrInput.getAttribute('value');
  }

  async setLotContInput(lotCont: string): Promise<void> {
    await this.lotContInput.sendKeys(lotCont);
  }

  async getLotContInput(): Promise<string> {
    return await this.lotContInput.getAttribute('value');
  }

  async setDestInput(dest: string): Promise<void> {
    await this.destInput.sendKeys(dest);
  }

  async getDestInput(): Promise<string> {
    return await this.destInput.getAttribute('value');
  }

  async setTriRegrouptBannInput(triRegrouptBann: string): Promise<void> {
    await this.triRegrouptBannInput.sendKeys(triRegrouptBann);
  }

  async getTriRegrouptBannInput(): Promise<string> {
    return await this.triRegrouptBannInput.getAttribute('value');
  }

  async setReglesInput(regles: string): Promise<void> {
    await this.reglesInput.sendKeys(regles);
  }

  async getReglesInput(): Promise<string> {
    return await this.reglesInput.getAttribute('value');
  }

  async setConditionnementInput(conditionnement: string): Promise<void> {
    await this.conditionnementInput.sendKeys(conditionnement);
  }

  async getConditionnementInput(): Promise<string> {
    return await this.conditionnementInput.getAttribute('value');
  }

  async setPeriodiciteInput(periodicite: string): Promise<void> {
    await this.periodiciteInput.sendKeys(periodicite);
  }

  async getPeriodiciteInput(): Promise<string> {
    return await this.periodiciteInput.getAttribute('value');
  }

  async setFlagMailInput(flagMail: string): Promise<void> {
    await this.flagMailInput.sendKeys(flagMail);
  }

  async getFlagMailInput(): Promise<string> {
    return await this.flagMailInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setVersionMoInput(versionMo: string): Promise<void> {
    await this.versionMoInput.sendKeys(versionMo);
  }

  async getVersionMoInput(): Promise<string> {
    return await this.versionMoInput.getAttribute('value');
  }

  async setQueuesEaiInInput(queuesEaiIn: string): Promise<void> {
    await this.queuesEaiInInput.sendKeys(queuesEaiIn);
  }

  async getQueuesEaiInInput(): Promise<string> {
    return await this.queuesEaiInInput.getAttribute('value');
  }

  async setQueuesEaiOutInput(queuesEaiOut: string): Promise<void> {
    await this.queuesEaiOutInput.sendKeys(queuesEaiOut);
  }

  async getQueuesEaiOutInput(): Promise<string> {
    return await this.queuesEaiOutInput.getAttribute('value');
  }

  async setLibre2Input(libre2: string): Promise<void> {
    await this.libre2Input.sendKeys(libre2);
  }

  async getLibre2Input(): Promise<string> {
    return await this.libre2Input.getAttribute('value');
  }

  async setLibre4Input(libre4: string): Promise<void> {
    await this.libre4Input.sendKeys(libre4);
  }

  async getLibre4Input(): Promise<string> {
    return await this.libre4Input.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ParamDemandeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-paramDemande-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-paramDemande'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
