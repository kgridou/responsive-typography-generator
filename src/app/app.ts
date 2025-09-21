import { Component, signal } from '@angular/core';

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
                    value="16"
                    step="1"
                  />
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>14px</span>
                    <span id="baseFontValue">16px</span>
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
                    value="1.25"
                    step="0.025"
                  />
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1.125</span>
                    <span id="typeScaleValue">1.25</span>
                    <span>1.5</span>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Line Height</label>
                  <select
                    id="lineHeight"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1.25">Tight (1.25)</option>
                    <option value="1.5" selected>Normal (1.5)</option>
                    <option value="1.75">Relaxed (1.75)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Letter Spacing</label>
                  <select
                    id="letterSpacing"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="-0.025em">Tight (-0.025em)</option>
                    <option value="0" selected>Normal (0)</option>
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
                    value="0.5"
                    step="0.25"
                  />
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.25vw</span>
                    <span id="viewportScaleValue">0.5vw</span>
                    <span>2vw</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="control-panel">
              <h3 class="text-xl font-semibold mb-4 text-gray-900">Application Method</h3>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input type="radio" name="method" value="individual" class="mr-3" checked />
                  <span class="text-sm">Individual Element Classes</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" name="method" value="global" class="mr-3" />
                  <span class="text-sm">Global .typography Class</span>
                </label>
              </div>
            </div>

            <div class="control-panel">
              <h3 class="text-xl font-semibold mb-4 text-gray-900">Generated CSS</h3>
              <div class="code-output" id="cssOutput"></div>
              <button
                id="copyCss"
                class="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
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
                  <div class="text-sm font-mono" id="mobileSize">16px</div>
                </div>
                <div class="p-3 bg-gray-50 rounded">
                  <div class="text-xs text-gray-500">Tablet</div>
                  <div class="text-sm font-mono" id="tabletSize">17px</div>
                </div>
                <div class="p-3 bg-gray-50 rounded">
                  <div class="text-xs text-gray-500">Desktop</div>
                  <div class="text-sm font-mono" id="desktopSize">18px</div>
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
}
