import React from 'react';
import { assert, expect } from 'chai';
import DocViewer from './DocViewer';
import content from './test/doc';
import { createMount } from '@kuveytturk/boa-test/utils';

describe('<DocViewer />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should mount', () => {
    mount(<DocViewer content={content} />);
  });

  it('should handle code language', () => {
    const codeContent = `\`\`\` js
    console.log('hello world');\`\`\`
    `;
    const wrapper = mount(<DocViewer content={codeContent} />);
    expect(wrapper.html()).contains('<code class="hljs"');
  });

  it('should handle without lang', () => {
    const codeContent = `\`\`\`
    console.log('hello world');\`\`\`
    `;
    const wrapper = mount(<DocViewer content={codeContent} />);
    expect(wrapper.html()).not.contains('<code class="hljs"');
  });

  it('should change editor type', () => {
    const wrapper = mount(<DocViewer content={content} />);
    wrapper.instance().changeEditorType({ target: { value: 'github' } });
    assert.strictEqual(wrapper.state().editorType, 'github');
    wrapper.setProps({ editorType: 'monokaiSublime' });
    assert.strictEqual(wrapper.state().editorType, 'monokaiSublime');
  });

  it('should create table of content', () => {
    const wrapper = mount(<DocViewer content={content} />);
    const toc = wrapper.instance().getTableOfContent();
    assert.strictEqual(toc.length, 1);
    assert.strictEqual(toc[0].level, 2);
    assert.strictEqual(toc[0].content, 'Table Of Content');
    assert.strictEqual(toc[0].children[0].level, 3);
    assert.strictEqual(toc[0].children[0].content, 'Table Of Content Child');
  });

  it('should create table of content with static method', () => {
    const toc = DocViewer.getTableOfContent(content);
    assert.strictEqual(toc.length, 2);
    assert.strictEqual(toc[0].level, 2);
    assert.strictEqual(toc[0].content, 'Table Of Content');
    assert.strictEqual(toc[1].level, 3);
    assert.strictEqual(toc[1].content, 'Table Of Content Child');
  });
});
