import { element, by, ElementFinder } from 'protractor';

export class MetaCoherisComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meta-coheris div table .btn-danger'));
  title = element.all(by.css('jhi-meta-coheris div h2#page-heading span')).first();
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

export class MetaCoherisUpdatePage {
  pageTitle = element(by.id('jhi-meta-coheris-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idTechInput = element(by.id('field_idTech'));
  societeInput = element(by.id('field_societe'));
  numSousInput = element(by.id('field_numSous'));
  numGRCInput = element(by.id('field_numGRC'));

  idTechSelect = element(by.id('field_idTech'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdTechInput(idTech: string): Promise<void> {
    await this.idTechInput.sendKeys(idTech);
  }

  async getIdTechInput(): Promise<string> {
    return await this.idTechInput.getAttribute('value');
  }

  async setSocieteInput(societe: string): Promise<void> {
    await this.societeInput.sendKeys(societe);
  }

  async getSocieteInput(): Promise<string> {
    return await this.societeInput.getAttribute('value');
  }

  async setNumSousInput(numSous: string): Promise<void> {
    await this.numSousInput.sendKeys(numSous);
  }

  async getNumSousInput(): Promise<string> {
    return await this.numSousInput.getAttribute('value');
  }

  async setNumGRCInput(numGRC: string): Promise<void> {
    await this.numGRCInput.sendKeys(numGRC);
  }

  async getNumGRCInput(): Promise<string> {
    return await this.numGRCInput.getAttribute('value');
  }

  async idTechSelectLastOption(): Promise<void> {
    await this.idTechSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async idTechSelectOption(option: string): Promise<void> {
    await this.idTechSelect.sendKeys(option);
  }

  getIdTechSelect(): ElementFinder {
    return this.idTechSelect;
  }

  async getIdTechSelectedOption(): Promise<string> {
    return await this.idTechSelect.element(by.css('option:checked')).getText();
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

export class MetaCoherisDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-metaCoheris-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-metaCoheris'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
