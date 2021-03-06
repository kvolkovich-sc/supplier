jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const ReferenceSearchInput = require('../ReferenceSearchInput.react').default;
const ReferenceSearchDialog = require('../../ReferenceSearchDialog/ReferenceSearchDialog.react').default;
const I18nContainer = require('../../../../../test/I18nContainer.react').default;

describe('ReferenceSearchInput', () => {
  let componentTree;

  beforeEach(function() {
    componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchInput
          title={"test"}
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          referenceSearchAction={() => {}}
          searchFields={[{
            name: "name",
            label: "label"
          }]}
          resultFields={[{
            name: "name2",
            label: "label2"
          }]}
          onChange={() => {}}
        />
      </I18nContainer>
    );
  });

  it('test is rendered', () => {
    expect(ReactDOM.findDOMNode(componentTree)).toBeDefined();
  });

  it('test is dialog open', () => {
    const referenceSearchInput =
      TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    expect(referenceSearchInput.state.openDialog).toBeFalsy();
    const searchButton = ReactDOM.findDOMNode(referenceSearchInput).querySelector('button');
    expect(searchButton).toBeDefined();
    TestUtils.Simulate.click(searchButton);
    expect(referenceSearchInput.state.openDialog).toBeTruthy();
  });

  it('test rendering with child', () => {
    let TestChildComponent = class extends React.Component {
      render() {
        return (
          <table>
            <tbody>
            <tr>
              <td>Column1</td>
              <td>Column2</td>
            </tr>
            </tbody>
          </table>
        );
      }
    };
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchInput
          title={"test"}
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          referenceSearchAction={() => {}}
          onChange={() => {}}
          searchFields={[{
            name: "name",
            label: "label"
          }]}
          resultFields={[{
            name: "name2",
            label: "label2"
          }]}
        >
          <TestChildComponent />
        </ReferenceSearchInput>
      </I18nContainer>
    );
    const testChildComponent =
      TestUtils.findRenderedComponentWithType(componentTree, TestChildComponent);
    expect(testChildComponent).toBeDefined();
    expect(testChildComponent.props.readOnly).toBeFalsy();
    expect(testChildComponent.props.disabled).toBeFalsy();
  });

  it('test reset button with single value', () => {
    const referenceSearchInput =
      TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    const referenceSearchDialog =
      TestUtils.findRenderedComponentWithType(referenceSearchInput, ReferenceSearchDialog);
    referenceSearchDialog.onSelect([{ id: '100' }]);
    expect(referenceSearchInput.state.value).toBeDefined();
    expect(referenceSearchInput.state.value.id).toBe('100');
    const resetButton = ReactDOM.findDOMNode(referenceSearchInput).querySelectorAll('button')[1];
    expect(resetButton).toBeDefined();
    TestUtils.Simulate.click(resetButton);
    expect(referenceSearchInput.state.value).toBe(null);
  });

  it('test reset button with multiple values', () => {
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchInput
          title={"test"}
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          referenceSearchAction={() => {}}
          onChange={() => {}}
          searchFields={[{
            name: "name",
            label: "label"
          }]}
          resultFields={[{
            name: "name2",
            label: "label2"
          }]}
          multiple={true}
        />
      </I18nContainer>
    );
    const referenceSearchInput =
      TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    const referenceSearchDialog =
      TestUtils.findRenderedComponentWithType(referenceSearchInput, ReferenceSearchDialog);
    referenceSearchDialog.onSelect([{ id: '100' }, { id: '200' }, { id: '300' }]);
    expect(referenceSearchInput.state.value.length).toBe(3);
    expect(referenceSearchInput.state.value[0].id).toBe('100');
    expect(referenceSearchInput.state.value[1].id).toBe('200');
    expect(referenceSearchInput.state.value[2].id).toBe('300');
    const resetButton = ReactDOM.findDOMNode(referenceSearchInput).querySelectorAll('button')[1];
    expect(resetButton).toBeDefined();
    TestUtils.Simulate.click(resetButton);
    expect(referenceSearchInput.state.value.length).toBe(0);
  });

  it('test is dialog close', () => {
    const referenceSearchInput =
      TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    const referenceSearchDialog =
      TestUtils.findRenderedComponentWithType(referenceSearchInput, ReferenceSearchDialog);
    expect(referenceSearchInput.state.openDialog).toBeFalsy();
    const searchButton = ReactDOM.findDOMNode(referenceSearchInput).querySelector('button');
    expect(searchButton).toBeDefined();
    TestUtils.Simulate.click(searchButton);
    expect(referenceSearchInput.state.openDialog).toBeTruthy();
    referenceSearchDialog.onSelect([{ id: '100' }]);
    expect(referenceSearchInput.state.openDialog).toBeFalsy();
  });

  it('test multiple values choice with value property', () => {
    let componentTree = TestUtils.renderIntoDocument(
      <I18nContainer>
        <ReferenceSearchInput
          title={"test"}
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          referenceSearchAction={() => {}}
          onChange={() => {}}
          searchFields={[{
            name: "name",
            label: "label"
          }]}
          resultFields={[{
            name: "name2",
            label: "label2"
          }]}
          multiple={true}
          value={[{ labelProperty: 'testValue1' }, { valueProperty: 'testValue2' }]}
        />
      </I18nContainer>
    );
    const referenceSearchInput =
      TestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    const referenceSearchDialog =
      TestUtils.findRenderedComponentWithType(referenceSearchInput, ReferenceSearchDialog);
    referenceSearchDialog.onSelect([{ valueProperty: '100' }, { valueProperty: 'testValue2' }]);
    expect(referenceSearchInput.state.value.length).toBe(3);
  });
});
