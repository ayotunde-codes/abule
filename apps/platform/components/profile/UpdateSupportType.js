import React from 'react';
import { connect } from 'react-redux';
import {
  InputSupport, InputPicker, InputSlider,
  Fn,
} from '@abule-common/components';
import { hideToastAlert, set } from '../../redux/toast-alert/action';
import { AgeGroups, Grades, Utils } from '../../datastore';

const {
  capitalize, ucFirst, creditToUsd,
} = Fn;

class UpdateSupportType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: props.min || 0,
      max: props.max || 100,
      start: props.min || 0,
      end: props.max || 100,
    };

    this.fields = {};
    this.toastAlert = null;
    this.timeOut = null;
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange(data) {
    const { state, props } = this;

    props.onChange({
      ...props.support,
      ...data,
    });
  }

  render() {
    const { props } = this;
    const { state } = this;
    const { support } = props;
    const start = props.start ? props.start : state.start;
    const end = props.end ? props.end : state.end;
    const min = props.min ? props.min : state.min;
    const max = props.max ? props.max : state.max;
    const allAgeGroup = AgeGroups.data;
    // alert('support data');
    const Subjects = Utils.getValue('Subjects');

    return (
      <div className="update-support-type">
        <div className="supports-row ">
          <div className="supports-row-label">Availability</div>
          <InputSupport
            inline
            support={support}
            onChange={(supportt) => {
              console.log({ supportt });
              // alert('supportt');
              this.onChange(supportt);
            }}
          />
        </div>

        {['tutoring'].includes(support.type)
          && (
            <>
              <div className="supports-row ">
                <div className="supports-row-label">Grades</div>
                <InputPicker
                  // direction="right"
                  // rowCount={2}
                  values={support.grades}
                  options={Grades.data.map((grade) => ({
                    value: grade.id,
                    label: ucFirst(grade.title),
                  }))}
                  onLoad={(e) => {
                    this.fields.grades = e.pickers;
                  }}
                  onChange={(values) => {
                    this.onChange({
                      grades: values,
                    });
                  }}
                />
              </div>

              <div className="supports-row ">
                <div className="supports-row-label">Subjects</div>
                <InputPicker
                  // direction="right"
                  // rowCount={2}
                  values={support.subjects}
                  options={Subjects.map((subject) => ({
                    value: subject,
                    label: capitalize(subject),
                  }))}
                  onLoad={(e) => {
                    this.fields.subjects = e.pickers;
                  }}
                  onChange={(values) => {
                    this.onChange({
                      subjects: values,
                    });
                  }}
                />
              </div>
            </>
          )}
        {!['tutoring'].includes(support.type) && (
          <>
            <div className="supports-row ">
              <div className="supports-row-label">Age</div>
              <InputSlider
                maxPreviewLabel="max"
                minPreviewLabel="min"
                values={support.age}
                min={allAgeGroup[0].start}
                max={allAgeGroup[allAgeGroup.length - 1].end}
                onChange={(values) => {
                  this.onChange({
                    age: values,
                  });
                }}
              />
            </div>
          </>
        )}

        {!['driving'].includes(support.type) && (
          <>
            <div className="supports-row ">
              <div className="supports-row-label">Price</div>
              <p className="description">The price unit is in credits (1 credit = ${creditToUsd(1)} USD)</p>
              <InputSlider
                minPreviewLabel={`min ($${creditToUsd(support.price ? support.price.start : 0)} USD)`}
                maxPreviewLabel={`max ($${creditToUsd(support.price ? support.price.end : 100)} USD)`}
                values={support.price}
                min={0}
                max={100}
                onChange={(values) => {
                  this.onChange({
                    price: values,
                  });
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

UpdateSupportType.defaultProps = {
  className: '',
  globalClassName: '',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  readOnly: false,
  style: {},
  onCancel: () => { },
  onChange: () => { },
  onKeyDown: () => { },
  minPreviewLabel: 'start',
  maxPreviewLabel: 'end',
};
const mapStateToProps = (state) => ({
  toastAlert: state.toastAlert,
});
const mapDispatchToProps = (dispatch) => ({
  hideToastAlert: () => dispatch(hideToastAlert()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSupportType);
