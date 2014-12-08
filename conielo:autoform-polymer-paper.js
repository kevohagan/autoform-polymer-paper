/*
 * Template helpers for "paper" template
 */
console.log('paper template helpers');
Template['quickForm_paper'].helpers({
    submitButtonAtts: function bsQuickFormSubmitButtonAtts() {
        var qfAtts = this.atts;
        var atts = {};
        if (typeof qfAtts.buttonClasses === "string") {
            atts['class'] = qfAtts.buttonClasses;
        } else {
            atts['class'] = 'btn btn-primary';
        }
        return atts;
    }
});

Template['afFormGroup_paper'].helpers({
    skipLabel: function bsFormGroupSkipLabel() {
        var self = this;

        var type = AutoForm.getInputType(self.afFieldInputAtts);
        return (self.skipLabel || type === "boolean-checkbox");
    },
    bsFieldLabelAtts: function bsFieldLabelAtts() {
        var atts = _.clone(this.afFieldLabelAtts);
        // Add bootstrap class
        atts = AutoForm.Utility.addClass(atts, "control-label");
        return atts;
    }
});

_.each([
    "afSelect_paper",
    "afBooleanSelect_paper",
    "afSelectMultiple_paper",
    "afTextarea_paper",
    "afInputText_paper",
    "afInputPassword_paper",
    "afInputDateTime_paper",
    "afInputDateTimeLocal_paper",
    "afInputDate_paper",
    "afInputMonth_paper",
    "afInputTime_paper",
    "afInputWeek_paper",
    "afInputNumber_paper",
    "afInputEmail_paper",
    "afInputUrl_paper",
    "afInputSearch_paper",
    "afInputTel_paper",
    "afInputColor_paper"
], function (tmplName) {
    Template[tmplName].helpers({
        atts: function addFormControlAtts() {
            var atts = _.clone(this.atts);
            // Add bootstrap class
            atts = AutoForm.Utility.addClass(atts, "form-control");
            return atts;
        }
    });
});

_.each([
    "afInputButton_paper",
    "afInputSubmit_paper",
    "afInputReset_paper",
], function (tmplName) {
    Template[tmplName].helpers({
        atts: function addFormControlAtts() {
            var atts = _.clone(this.atts);
            // Add bootstrap class
            atts = AutoForm.Utility.addClass(atts, "btn");
            return atts;
        }
    });
});

Template["afRadio_paper"].helpers({
    atts: function selectedAttsAdjust() {
        var atts = _.clone(this.atts);
        if (this.selected) {
            atts.checked = "";
        }
        return atts;
    }
});

_.each([
    "afCheckboxGroup_paper",
    "afRadioGroup_paper",
    "afCheckboxGroupInline_paper",
    "afRadioGroupInline_paper"
], function (tmplName) {
    Template[tmplName].helpers({
        atts: function selectedAttsAdjust() {
            var atts = _.clone(this.atts);
            if (this.selected) {
                atts.checked = "";
            }
            // remove data-schema-key attribute because we put it
            // on the entire group
            delete atts["data-schema-key"];
            return atts;
        },
        dsk: function dsk() {
            return {
                "data-schema-key": this.atts["data-schema-key"]
            }
        }
    });
});

var selectHelpers = {
    optionAtts: function afSelectOptionAtts() {
        var item = this;
        var atts = {
            value: item.value
        };
        if (item.selected) {
            atts.selected = "";
        }
        return atts;
    }
};
Template["afSelect_paper"].helpers(selectHelpers);
Template["afSelectMultiple_paper"].helpers(selectHelpers);
Template["afBooleanSelect_paper"].helpers(selectHelpers);

Template["afBooleanRadioGroup_paper"].helpers({
    falseAtts: function falseAtts() {
        var atts = _.omit(this.atts, 'trueLabel', 'falseLabel');
        if (this.value === false) {
            atts.checked = "";
        }
        return atts;
    },
    trueAtts: function trueAtts() {
        var atts = _.omit(this.atts, 'trueLabel', 'falseLabel');
        if (this.value === true) {
            atts.checked = "";
        }
        return atts;
    }
});