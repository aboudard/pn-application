import { element, by, ElementFinder } from 'protractor';

export class MetaSIRHComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meta-sirh div table .btn-danger'));
  title = element.all(by.css('jhi-meta-sirh div h2#page-heading span')).first();
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

export class MetaSIRHUpdatePage {
  pageTitle = element(by.id('jhi-meta-sirh-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idTechInput = element(by.id('field_idTech'));
  numBadgeInput = element(by.id('field_numBadge'));
  numBadgeDestInput = element(by.id('field_numBadgeDest'));
  nomCollabInput = element(by.id('field_nomCollab'));
  prenomCollabInput = element(by.id('field_prenomCollab'));
  codeUOInput = element(by.id('field_codeUO'));

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

  async setNumBadgeInput(numBadge: string): Promise<void> {
    await this.numBadgeInput.sendKeys(numBadge);
  }

  async getNumBadgeInput(): Promise<string> {
    return await this.numBadgeInput.getAttribute('value');
  }

  async setNumBadgeDestInput(numBadgeDest: string): Promise<void> {
    await this.numBadgeDestInput.sendKeys(numBadgeDest);
  }

  async getNumBadgeDestInput(): Promise<string> {
    return await this.numBadgeDestInput.getAttribute('value');
  }

  async setNomCollabInput(nomCollab: string): Promise<void> {
    await this.nomCollabInput.sendKeys(nomCollab);
  }

  async getNomCollabInput(): Promise<string> {
    return await this.nomCollabInput.getAttribute('value');
  }

  async setPrenomCollabInput(prenomCollab: string): Promise<void> {
    await this.prenomCollabInput.sendKeys(prenomCollab);
  }

  async getPrenomCollabInput(): Promise<string> {
    return await this.prenomCollabInput.getAttribute('value');
  }

  async setCodeUOInput(codeUO: string): Promise<void> {
    await this.codeUOInput.sendKeys(codeUO);
  }

  async getCodeUOInput(): Promise<string> {
    return await this.codeUOInput.getAttribute('value');
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

export class MetaSIRHDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-metaSIRH-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-metaSIRH'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
