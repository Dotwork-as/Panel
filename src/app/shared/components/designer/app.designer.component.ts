import { ChangeDetectorRef, Component, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { DesignerService } from '@shared/services/designerservice';
import { TabsModule } from 'primeng/tabs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import theme from '../../../theme/theme';
import { PrimeNG } from 'primeng/config';
import { FormsModule } from '@angular/forms';
import { $dt, updatePreset, usePreset } from '@primeng/themes';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { DesignBorderRadius } from './primitive/designborderradius';
import { DesignColors } from './primitive/designcolors';
import { DesignGeneral } from './semantic/designgeneral';
import { DesignFormField } from './semantic/designformfield';
import { DesignList } from './semantic/designlist';
import { DesignNavigation } from './semantic/designnavigation';
import { DesignOverlay } from './semantic/designoverlay';
import { DesignCS } from './semantic/colorscheme/designcs';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import  config from '../../../../../theme.json'
import { ThemeService } from '../../../theme/theme.service'
import { LocalStorageService } from '../../services/local-storage/local-storage.service'
import { Store } from '@ngrx/store'
import { AppState } from '@core/core.state'
import {
  actionSettingsChangeInputLabelPosition,
  actionSettingsChangeInputVariant,
  actionSettingsChangeProfileMenu,
  actionSettingsChangeSidebarType,
  actionSettingsChangeNavbarType
} from '@core/settings/settings.actions'
import { Fieldset } from 'primeng/fieldset'

const presets = {
    theme
};
@Component({
    selector: 'app-designer',
    standalone: true,
  imports: [
    CommonModule,
    DrawerModule,
    TabsModule,
    SelectButtonModule,
    DividerModule,
    ButtonModule,
    TagModule,
    AccordionModule,
    FormsModule,
    FileUploadModule,
    DesignBorderRadius,
    DesignColors,
    DesignGeneral,
    DesignFormField,
    DesignList,
    DesignNavigation,
    DesignOverlay,
    DesignCS,
    ToastModule,
    SkeletonModule,
    Fieldset
  ],
  template: `<p-drawer [visible]="visible" (visibleChange)="hide($event)" header="Drawer" header="Theme Designer" position="right" styleClass="designer !w-screen md:!w-[48rem]" [modal]="false" [dismissible]="false">
            <p-tabs [(value)]="activeTab">
                <p-tablist>
                    <p-tab value="0">Base</p-tab>
                    <p-tab value="1">Semantic</p-tab>
                </p-tablist>

                <p-tabpanels>
                    @defer (when activeTab == '0') {
                      <p-tabpanel value="0">
                        <div class="flex flex-col gap-3">
                          <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">

                            <p-fieldset legend="Input" [toggleable]="true">
                              <div class="flex flex-col gap-2 my-2 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                                <span class="font-semibold">Variant</span>
                                <p-selectbutton [ngModel]="selectedInputVariant()" (ngModelChange)="onInputVariantChange($event)" [options]="inputVariantOptions" optionLabel="label" optionValue="value" [allowEmpty]="false" [ngModelOptions]="{standalone: true}" />
                              </div>
                              <div class="flex flex-col gap-2 my-2 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                                <span class="font-semibold">Label Position</span>
                                <p-selectbutton [ngModel]="selectedInputLabelPosition()" (ngModelChange)="onInputLabelPositionChange($event)" [options]="inputLabelPosition" optionLabel="label" optionValue="value" [allowEmpty]="false" [ngModelOptions]="{standalone: true}" />
                              </div>
                            </p-fieldset>

                            <p-fieldset legend="Sidebar" [toggleable]="true">
                              <div class="flex flex-col gap-2 my-2 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                                <span class="font-semibold">Type</span>
                                <p-selectbutton [ngModel]="selectedSidebarType()" (ngModelChange)="onSidebarTypeChange($event)" [options]="sidebarTypeOptions" optionLabel="label" optionValue="value" [allowEmpty]="false" [ngModelOptions]="{standalone: true}" />
                              </div>
                              <div class="flex flex-col gap-2 my-2 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                                <span class="font-semibold">Profile Menu</span>
                                <p-selectbutton [ngModel]="selectedProfileMenu()" (ngModelChange)="onProfileMenuChange($event)" [options]="sidebarProfileMenu" optionLabel="label" optionValue="value" [allowEmpty]="false" [ngModelOptions]="{standalone: true}" />
                              </div>
                            </p-fieldset>

                            
                            <p-fieldset legend="Navbar" [toggleable]="true">
                              <div class="flex flex-col gap-2 my-2 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                                <span class="font-semibold">Type</span>
                                <p-selectbutton [ngModel]="selectedNavbarType()" (ngModelChange)="onNavbarTypeChange($event)" [options]="navbarTypeOptions" optionLabel="label" optionValue="value" [allowEmpty]="false" [ngModelOptions]="{standalone: true}" />
                              </div>
            
                            </p-fieldset>

                            <design-border-radius />
                            <design-colors />
                          </form>
                        </div>
                      </p-tabpanel>
                    } @loading {
                      <p-skeleton width="100%" height="15rem" styleClass="mt-4" />
                      <p-skeleton width="100%" height="15rem" styleClass="mt-4" />
                    }

                    @defer (when activeTab == '1') {
                        <p-tabpanel value="1">
                            <p-accordion [value]="['0', '1']" [multiple]="true" *ngIf="true">
                                <p-accordion-panel value="0">
                                    <p-accordion-header>Common</p-accordion-header>
                                    <p-accordion-content>
                                        <div class="flex flex-col gap-3">
                                            <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
                                                <design-general />
                                                <design-form-field />
                                                <design-list />
                                                <design-navigation />
                                                <design-overlay />
                                            </form>
                                        </div>
                                    </p-accordion-content>
                                </p-accordion-panel>

                                <p-accordion-panel value="1">
                                    <p-accordion-header>Color Scheme</p-accordion-header>
                                    <p-accordion-content>
                                        <p-tabs value="cs-0">
                                            <p-tablist>
                                                <p-tab value="cs-0">Light</p-tab>
                                                <p-tab value="cs-1">Dark</p-tab>
                                            </p-tablist>
                                            <p-tabpanels class="!px-0">
                                                <p-tabpanel value="cs-0">
                                                    <form (keydown)="onKeyDown($event)">
                                                        <design-cs (apply)="apply()" [dark]="false" [value]="designerService.preset().semantic.colorScheme.light" />
                                                    </form>
                                                </p-tabpanel>
                                                <p-tabpanel value="cs-1">
                                                    <form (keydown)="onKeyDown($event)">
                                                        <design-cs (apply)="apply()" [dark]="true" [value]="designerService.preset().semantic.colorScheme.dark" />
                                                    </form>
                                                </p-tabpanel>
                                            </p-tabpanels>
                                        </p-tabs>
                                    </p-accordion-content>
                                </p-accordion-panel>
                            </p-accordion>
                        </p-tabpanel>
                    } @loading {
                        <p-skeleton width="100%" height="8rem" styleClass="mt-4" />
                        <p-skeleton width="100%" height="30rem" styleClass="mt-4" />
                    }
                </p-tabpanels>
            </p-tabs>

      <div class="flex m-5  gap-2">
        <button
          type="button"
          (click)="download()"
          icon="pi pi-download"
          class="px-3 py-2 bg-transparent border border-gray-200 dark:border-gray-700 hover:border-gray-800 dark:hover:border-gray-500 text-black dark:text-white rounded-md font-medium cursor-pointer transition-colors duration-200 focus:outline focus:outline-offset-2 focus:outline-zinc-950 focus:dark:outline-white"
        >
          Download
        </button>
      </div>
  </p-drawer>
        <p-toast />`,
    providers: [MessageService]
})
export class AppDesignerComponent {

    private themeService = inject(ThemeService);

    private cd = inject(ChangeDetectorRef);

    private storage = inject(LocalStorageService);

    private store: Store<AppState> = inject(Store);

    public designerService = inject(DesignerService);

    private messageService = inject(MessageService);

    config: PrimeNG = inject(PrimeNG);

    selectedPreset = computed(() => 'theme');

    selectedSidebarType = computed(() => this.themeService.config.menu_type);
    selectedNavbarType = computed(() => this.themeService.config.navbar_type);
    selectedProfileMenu = computed(() => this.themeService.config.profile_menu);
    selectedInputVariant = computed(() => this.themeService.config.input_variant);
    selectedInputLabelPosition = computed(() => this.themeService.config.input_label_position);

    presets = Object.keys(presets);

    preset;

    customTokens = [];

    acTokens = [];

    activeTab = '0';

    ngOnInit() {
        this.preset = {
            primitive: presets['theme'].primitive,
            semantic: presets['theme'].semantic
        };
        this.generateACTokens(null, this.preset);
        this.replaceColorPalette();
        this.designerService.setPreset(this.preset);
        this.designerService.setAcTokens(this.acTokens);
    }

    presetOptions = [
      { label: 'Theme', value: 'theme' }
    ];

  sidebarTypeOptions = [
    { label: 'Static', value: 'static' },
    { label: 'Slim', value: 'slim' },
    { label: 'Slim+', value: 'slim+' },
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'None', value: 'none' },
  ];

  navbarTypeOptions = [
    { label: 'Space Between', value: 'spaceBetween' },
    { label: 'Center', value: 'center' },
  ];

  sidebarProfileMenu = [
    { label: 'Start', value: 'start' },
    { label: 'End', value: 'end' },
  ];

  inputVariantOptions = [
    { label: 'Filled', value: 'filled' },
    { label: 'Outlined', value: 'outlined' },
  ];

  inputLabelPosition = [
    { label: 'In', value: 'in' },
    { label: 'On', value: 'on' },
    { label: 'Over', value: 'over' },
  ];

  get visible() {
    return JSON.parse(localStorage.getItem('appConfigState'))?.menuActive;
  }

  hide(event) {
    !event && localStorage.setItem('appConfigState', JSON.stringify({...JSON.parse(localStorage.getItem('appConfigState')), menuActive: false}))
  }

  apply() {
    updatePreset(this.preset);
    this.designerService.preset.update((state) => ({ ...state, ...this.preset }));
  }


  onSidebarTypeChange(value: any) {
    this.store.dispatch(actionSettingsChangeSidebarType({sidebar_type: value}))
    this.storage.setItem('theme', {...this.themeService.config, menu_type: value})
  }

  onNavbarTypeChange(value: any) {
    this.store.dispatch(actionSettingsChangeNavbarType({navbar_type: value}))
    this.storage.setItem('theme', {...this.themeService.config, navbar_type: value})
  }

  onProfileMenuChange(value: any) {
    this.store.dispatch(actionSettingsChangeProfileMenu({profile_menu: value}))
    this.storage.setItem('theme', {...this.themeService.config, profile_menu: value})
  }

  onInputVariantChange(value: any) {
    this.store.dispatch(actionSettingsChangeInputVariant({input_variant: value}))
    this.storage.setItem('theme', {...this.themeService.config, input_variant: value})
  }

  onInputLabelPositionChange(value: any) {
    this.store.dispatch(actionSettingsChangeInputLabelPosition({ input_label_position: value}))
    this.storage.setItem('theme', {...this.themeService.config, input_label_position: value})
  }

  generateACTokens(parentPath, obj) {
    for (let key in obj) {
      if (key === 'dark') {
        continue;
      }

      if (key === 'primitive' || key === 'semantic' || key === 'colorScheme' || key === 'light' || key === 'extend') {
        this.generateACTokens(null, obj[key]);
      } else {
        if (typeof obj[key] === 'object') {
          this.generateACTokens(parentPath ? parentPath + '.' + key : key, obj[key]);
        } else {
          const regex = /\.\d+$/;
          const tokenName = this.camelCaseToDotCase(parentPath ? parentPath + '.' + key : key);
          const tokenValue = $dt(tokenName).value;
          const isColor = tokenName.includes('color') || tokenName.includes('background') || regex.test(tokenName);

          this.acTokens.push({ token: tokenName, label: '{' + tokenName + '}', variable: $dt(tokenName).variable, value: tokenValue, isColor: isColor });
          this.designerService.setAcTokens(this.acTokens);
        }
      }
    }
  }

  replaceColorPalette() {
    // this.preset.semantic.primary = this.preset.primitive.emerald;
    this.preset.semantic.colorScheme.light.surface = { ...{ 0: '#ffffff' }, ...this.preset.primitive.slate };
    this.preset.semantic.colorScheme.dark.surface = { ...{ 0: '#ffffff' }, ...this.preset.primitive.zinc };
  }


    camelCaseToDotCase(name) {
        return name.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
    }


    onKeyDown(event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.apply();
            this.themeService.saveTheme({...this.themeService.config, primeng: this.preset})
          event.preventDefault();
        }
    }

    download() {
      this.downloadThemeJson()
      this.downloadTailwindConfig()
    }


  downloadTailwindConfig() {

    let variables = '';
    for (const [colorName, shades] of Object.entries(config.colors)) {
      for (const [shade, value] of Object.entries(shades)) {
        variables+= `--color-${colorName}-${shade}: ${value};\n`
      }
    }
    const textContent = `
@use 'tailwindcss';
@plugin 'tailwindcss-primeui';
@custom-variant dark (&:where(.dark, .dark *));

@theme {
 --font-roboto: Roboto;
 --font-vazir: Roboto;
${variables}

--color-surface-0:   var(--color-surface_light-0);
--color-surface-50:  var(--color-surface_light-50);
--color-surface-100: var(--color-surface_light-100);
--color-surface-200: var(--color-surface_light-200);
--color-surface-300: var(--color-surface_light-300);
--color-surface-400: var(--color-surface_light-400);
--color-surface-500: var(--color-surface_light-500);
--color-surface-600: var(--color-surface_light-600);
--color-surface-700: var(--color-surface_light-700);
--color-surface-800: var(--color-surface_light-800);
--color-surface-900: var(--color-surface_light-900);
--color-surface-950: var(--color-surface_light-950);

}

@layer base {
  @variant dark {
    --color-surface-0:   var(--color-surface_dark-0);
    --color-surface-50:  var(--color-surface_dark-50);
    --color-surface-100: var(--color-surface_dark-100);
    --color-surface-200: var(--color-surface_dark-200);
    --color-surface-300: var(--color-surface_dark-300);
    --color-surface-400: var(--color-surface_dark-400);
    --color-surface-500: var(--color-surface_dark-500);
    --color-surface-600: var(--color-surface_dark-600);
    --color-surface-700: var(--color-surface_dark-700);
    --color-surface-800: var(--color-surface_dark-800);
    --color-surface-900: var(--color-surface_dark-900);
    --color-surface-950: var(--color-surface_dark-950);
  }
}`;

    const blob = new Blob([textContent], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = 'tailwind-config.scss';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  downloadThemeJson() {

    const theme = JSON.stringify({ ...config, primeng: this.preset, colors: config.colors }, null, 2);
    const textContent = `${theme}`;
    const blob = new Blob([textContent], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = 'theme.json';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
