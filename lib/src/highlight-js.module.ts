import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightJsDirective } from './highlight-js.directive';
import hljs from 'highlight.js/lib/highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

export const HLJS = new InjectionToken<any>('hljs lib', {
  providedIn: 'root',
  factory: () => hljs,
});

export function configurationFactory(config: any) {
  console.log('config', config);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('xml', html);
  return hljs;
}

@NgModule({
  imports: [FormsModule],
  declarations: [HighlightJsDirective],
  exports: [HighlightJsDirective]
})
export class HighlightJsModule {
  public static forRoot(config: object): ModuleWithProviders<HighlightJsModule> {
    return {
      ngModule: HighlightJsModule,
      providers: [
        { provide: HLJS, useFactory: configurationFactory, deps: [config] }
      ],
    };
  }
}
