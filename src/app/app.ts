import { Component, signal, computed, effect, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <div class="bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-fluid-5xl font-bold text-gray-900 mb-4">
            Responsive Typography Generator
          </h1>
          <p class="text-fluid-lg text-gray-600 max-w-3xl mx-auto">
            Generate fluid, responsive typography using Tailwind CSS variables and modern CSS
            clamp() functions. Control your type system with precision across all screen sizes.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Controls -->
          <div class="space-y-6">
            <div class="control-panel">
              <h3 class="text-xl font-semibold mb-4 text-gray-900">Typography Controls</h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Base Font Size</label>
                  <input
                    type="range"
                    id="baseFontSize"
                    class="slider w-full"
                    min="14"
                    max="20"
                    [value]="baseFontSize()"
                    step="1"
                    (input)="onBaseFontSizeChange($event)"
                  />
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>14px</span>
                    <span id="baseFontValue">{{ baseFontValue() }}</span>
                    <span>20px</span>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Type Scale Ratio</label
                  >
                  <input
                    type="range"
                    id="typeScale"
                    class="slider w-full"
                    min="1.125"
                    max="1.5"
                    [value]="typeScale()"
                    step="0.025"
                    (input)="onTypeScaleChange($event)"
                  />
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1.125</span>
                    <span id="typeScaleValue">{{ typeScaleValue() }}</span>
                    <span>1.5</span>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Line Height</label>
                  <select
                    id="lineHeight"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    [value]="lineHeight()"
                    (change)="onLineHeightChange($event)"
                  >
                    <option value="1.25">Tight (1.25)</option>
                    <option value="1.5">Normal (1.5)</option>
                    <option value="1.75">Relaxed (1.75)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Letter Spacing</label>
                  <select
                    id="letterSpacing"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    [value]="letterSpacing()"
                    (change)="onLetterSpacingChange($event)"
                  >
                    <option value="-0.025em">Tight (-0.025em)</option>
                    <option value="0">Normal (0)</option>
                    <option value="0.025em">Wide (0.025em)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Viewport Scaling</label
                  >
                  <input
                    type="range"
                    id="viewportScale"
                    class="slider w-full"
                    min="0.25"
                    max="2"
                    [value]="viewportScale()"
                    step="0.25"
                    (input)="onViewportScaleChange($event)"
                  />
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.25vw</span>
                    <span id="viewportScaleValue">{{ viewportScaleValue() }}</span>
                    <span>2vw</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="control-panel">
              <h3 class="text-xl font-semibold mb-4 text-gray-900">Application Method</h3>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="method"
                    value="individual"
                    class="mr-3"
                    [checked]="method() === 'individual'"
                    (change)="onMethodChange($event)"
                  />
                  <span class="text-sm">Individual Element Classes</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="method"
                    value="global"
                    class="mr-3"
                    [checked]="method() === 'global'"
                    (change)="onMethodChange($event)"
                  />
                  <span class="text-sm">Global .typography Class</span>
                </label>
              </div>
            </div>

            <div class="control-panel">
              <h3 class="text-xl font-semibold mb-4 text-gray-900">Generated CSS</h3>
              <div class="code-output" #cssOutput>{{ generatedCSS() }}</div>
              <button
                id="copyCss"
                class="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                (click)="copyCSS()"
              >
                Copy CSS
              </button>
            </div>
          </div>

          <!-- Preview -->
          <div class="space-y-6">
            <div class="preview-card">
              <div class="typography" id="preview">
                <h1>Fluid Typography Showcase</h1>
                <p class="lead">
                  This is a lead paragraph that demonstrates how responsive typography adapts
                  beautifully across different screen sizes and devices.
                </p>

                <h2>Section Heading</h2>
                <p>
                  This is a regular paragraph with normal text flow. The typography system ensures
                  optimal readability by automatically adjusting font sizes, line heights, and
                  spacing based on the viewport size.
                </p>

                <h3>Subsection Title</h3>
                <p>
                  Here's another paragraph showing how consistent vertical rhythm is maintained
                  throughout different heading levels and text elements.
                </p>

                <blockquote>
                  "Typography is the craft of endowing human language with a durable visual form."
                </blockquote>

                <h4>Code Examples</h4>
                <p>
                  Inline code like <code>clamp(1rem, 0.9rem + 0.5vw, 1.125rem)</code> demonstrates
                  how we achieve fluid scaling.
                </p>

                <pre><code>.text-fluid-base &#123;
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
&#125;</code></pre>

                <h5>Lists and Structure</h5>
                <ul>
                  <li>Fluid typography scales smoothly</li>
                  <li>No awkward breakpoints or jumps</li>
                  <li>Maintains optimal reading experience</li>
                  <li>Works across all device sizes</li>
                </ul>

                <h6>Small Details</h6>
                <p class="small">
                  This is small text that still maintains readability while providing visual
                  hierarchy and emphasis where needed.
                </p>
              </div>
            </div>

            <div class="bg-white rounded-lg p-6 shadow-lg">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">Responsive Breakpoint Test</h3>
              <p class="text-sm text-gray-600 mb-4">
                Resize your browser window to see the typography adapt in real-time.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div class="p-3 bg-gray-50 rounded">
                  <div class="text-xs text-gray-500">Mobile</div>
                  <div class="text-sm font-mono" id="mobileSize">{{ mobileSize() }}</div>
                </div>
                <div class="p-3 bg-gray-50 rounded">
                  <div class="text-xs text-gray-500">Tablet</div>
                  <div class="text-sm font-mono" id="tabletSize">{{ tabletSize() }}</div>
                </div>
                <div class="p-3 bg-gray-50 rounded">
                  <div class="text-xs text-gray-500">Desktop</div>
                  <div class="text-sm font-mono" id="desktopSize">{{ desktopSize() }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('responsive-typography-generator');

  // Settings signals
  protected readonly baseFontSize = signal(16);
  protected readonly typeScale = signal(1.25);
  protected readonly lineHeight = signal('1.5');
  protected readonly letterSpacing = signal('0');
  protected readonly viewportScale = signal(0.5);
  protected readonly method = signal<'individual' | 'global'>('individual');

  // Display values
  protected readonly baseFontValue = computed(() => `${this.baseFontSize()}px`);
  protected readonly typeScaleValue = computed(() => this.typeScale().toString());
  protected readonly viewportScaleValue = computed(() => `${this.viewportScale()}vw`);

  // Breakpoint display
  protected readonly mobileSize = computed(() => {
    const base = this.baseFontSize();
    const scale = this.viewportScale();
    const size = Math.max(base * 0.875, base * 0.9 + (320 * scale) / 100);
    return `${Math.round(size)}px`;
  });

  protected readonly tabletSize = computed(() => {
    const base = this.baseFontSize();
    const scale = this.viewportScale();
    const size = base * 0.9 + (768 * scale) / 100;
    return `${Math.round(size)}px`;
  });

  protected readonly desktopSize = computed(() => {
    const base = this.baseFontSize();
    const scale = this.viewportScale();
    const size = Math.min(base * 1.125, base * 0.9 + (1024 * scale) / 100);
    return `${Math.round(size)}px`;
  });

  // CSS generation
  protected readonly generatedCSS = computed(() => {
    const base = this.baseFontSize();
    const scale = this.typeScale();
    const lineHeight = this.lineHeight();
    const letterSpacing = this.letterSpacing();
    const viewport = this.viewportScale();
    const method = this.method();

    if (method === 'global') {
      return `:root {
  --type-scale-ratio: ${scale};
  --base-font-size: clamp(${base * 0.875}px, ${base * 0.9}px + ${viewport}vw, ${base * 1.125}px);
  --line-height-normal: ${lineHeight};
  --letter-spacing-normal: ${letterSpacing};
}

.typography {
  --flow-space: 1.5rem;
  font-size: var(--base-font-size);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
}

.typography * + * {
  margin-top: var(--flow-space);
}

.typography h1 {
  font-size: clamp(${Math.round(base * Math.pow(scale, 4))}px, ${Math.round(base * Math.pow(scale, 3.5))}px + ${viewport * 2.5}vw, ${Math.round(base * Math.pow(scale, 5))}px);
  line-height: 1.25;
  letter-spacing: -0.025em;
  font-weight: 800;
  --flow-space: 3rem;
}

.typography h2 {
  font-size: clamp(${Math.round(base * Math.pow(scale, 3))}px, ${Math.round(base * Math.pow(scale, 2.5))}px + ${viewport * 1.75}vw, ${Math.round(base * Math.pow(scale, 4))}px);
  line-height: 1.25;
  letter-spacing: -0.025em;
  font-weight: 700;
  --flow-space: 2.5rem;
}

.typography h3 {
  font-size: clamp(${Math.round(base * Math.pow(scale, 2.5))}px, ${Math.round(base * Math.pow(scale, 2))}px + ${viewport * 1.375}vw, ${Math.round(base * Math.pow(scale, 3.5))}px);
  line-height: 1.25;
  letter-spacing: -0.025em;
  font-weight: 600;
  --flow-space: 2rem;
}`;
    } else {
      return `/* Fluid Typography Utilities */
.text-fluid-xs { font-size: clamp(${Math.round(base * 0.75)}px, ${Math.round(base * 0.7)}px + ${viewport * 0.25}vw, ${Math.round(base * 0.875)}px); }
.text-fluid-sm { font-size: clamp(${Math.round(base * 0.875)}px, ${Math.round(base * 0.8)}px + ${viewport * 0.375}vw, ${base}px); }
.text-fluid-base { font-size: clamp(${base}px, ${Math.round(base * 0.9)}px + ${viewport}vw, ${Math.round(base * 1.125)}px); }
.text-fluid-lg { font-size: clamp(${Math.round(base * 1.125)}px, ${base}px + ${viewport * 0.625}vw, ${Math.round(base * 1.25)}px); }
.text-fluid-xl { font-size: clamp(${Math.round(base * 1.25)}px, ${Math.round(base * 1.1)}px + ${viewport * 0.75}vw, ${Math.round(base * 1.5)}px); }
.text-fluid-2xl { font-size: clamp(${Math.round(base * 1.5)}px, ${Math.round(base * 1.3)}px + ${viewport}vw, ${base * 2}px); }
.text-fluid-3xl { font-size: clamp(${Math.round(base * Math.pow(scale, 2.5))}px, ${Math.round(base * Math.pow(scale, 2))}px + ${viewport * 1.375}vw, ${Math.round(base * Math.pow(scale, 3.5))}px); }
.text-fluid-4xl { font-size: clamp(${Math.round(base * Math.pow(scale, 3))}px, ${Math.round(base * Math.pow(scale, 2.5))}px + ${viewport * 1.75}vw, ${Math.round(base * Math.pow(scale, 4))}px); }
.text-fluid-5xl { font-size: clamp(${Math.round(base * Math.pow(scale, 4))}px, ${Math.round(base * Math.pow(scale, 3.5))}px + ${viewport * 2.5}vw, ${Math.round(base * Math.pow(scale, 5))}px); }
.text-fluid-6xl { font-size: clamp(${Math.round(base * Math.pow(scale, 5))}px, ${Math.round(base * Math.pow(scale, 4.5))}px + ${viewport * 3.75}vw, ${Math.round(base * Math.pow(scale, 6))}px); }

/* Line Heights */
.leading-tight { line-height: 1.25; }
.leading-normal { line-height: ${lineHeight}; }
.leading-relaxed { line-height: 1.75; }

/* Letter Spacing */
.tracking-tight { letter-spacing: -0.025em; }
.tracking-normal { letter-spacing: ${letterSpacing}; }
.tracking-wide { letter-spacing: 0.025em; }`;
    }
  });

  private cssOutputElement = viewChild<ElementRef<HTMLElement>>('cssOutput');

  constructor() {
    // Update CSS custom properties when settings change
    effect(() => {
      const root = document.documentElement;
      const base = this.baseFontSize();
      const scale = this.typeScale();
      const lineHeight = this.lineHeight();
      const letterSpacing = this.letterSpacing();
      const viewport = this.viewportScale();

      root.style.setProperty(
        '--base-font-size',
        `clamp(${base * 0.875}px, ${base * 0.9}px + ${viewport}vw, ${base * 1.125}px)`,
      );
      root.style.setProperty('--line-height-normal', lineHeight);
      root.style.setProperty('--letter-spacing-normal', letterSpacing);
      root.style.setProperty('--type-scale-ratio', scale.toString());
    });
  }

  protected onBaseFontSizeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.baseFontSize.set(parseInt(target.value));
  }

  protected onTypeScaleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.typeScale.set(parseFloat(target.value));
  }

  protected onLineHeightChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.lineHeight.set(target.value);
  }

  protected onLetterSpacingChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.letterSpacing.set(target.value);
  }

  protected onViewportScaleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.viewportScale.set(parseFloat(target.value));
  }

  protected onMethodChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.method.set(target.value as 'individual' | 'global');
  }

  protected async copyCSS(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.generatedCSS());
      const button = document.getElementById('copyCss') as HTMLButtonElement;
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('bg-green-600');
      button.classList.remove('bg-blue-600');
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-600');
        button.classList.add('bg-blue-600');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  }
}
