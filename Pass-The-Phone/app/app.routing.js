"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start_component_1 = require("./pages/start/start.component");
var groupTypeSelector_component_1 = require("./pages/groupTypeSelector/groupTypeSelector.component");
var playerCreator_component_1 = require("./pages/playerCreator/playerCreator.component");
var groupSelector_component_1 = require("./pages/groupSelector/groupSelector.component");
var modeSelector_component_1 = require("./pages/modeSelector/modeSelector.component");
var teamBuilder_component_1 = require("./pages/teamBuilder/teamBuilder.component");
var subjectSelector_component_1 = require("./pages/subjectSelector/subjectSelector.component");
var questionPresenter_component_1 = require("./pages/questionPresenter/questionPresenter.component");
var questionPreAnswer_component_1 = require("./pages/questionPreAnswer/questionPreAnswer.component");
var answer_component_1 = require("./pages/answer/answer.component");
var answerValidation_component_1 = require("./pages/answerValidation/answerValidation.component");
var summary_component_1 = require("./pages/summary/summary.component");
var creating_listview_component_1 = require("./pages/listView/creating-listview.component");
exports.routes = [
    { path: "", redirectTo: "/start", pathMatch: "full" },
    { path: "start", component: start_component_1.StartComponent },
    { path: "groupTypeSelector", component: groupTypeSelector_component_1.GroupTypeSelectorComponent },
    { path: "playerCreator", component: playerCreator_component_1.PlayerCreatorComponent },
    { path: "groupSelector", component: groupSelector_component_1.GroupSelectorComponent },
    { path: "modeSelector", component: modeSelector_component_1.ModeSelectorComponent },
    { path: "teamBuilder", component: teamBuilder_component_1.TeamBuilderComponent },
    { path: "subjectSelector", component: subjectSelector_component_1.SubjectSelectorComponent },
    { path: "questionPresenter/:id", component: questionPresenter_component_1.QuestionPresenterComponent },
    { path: "questionPreAnswer", component: questionPreAnswer_component_1.QuestionPreAnswerComponent },
    { path: "answer", component: answer_component_1.AnswerComponent },
    { path: "answerValidation/:correct/:answer", component: answerValidation_component_1.AnswerValidationComponent },
    { path: "summary", component: summary_component_1.SummaryComponent },
    { path: "creatingListView", component: creating_listview_component_1.CreatingListViewComponent }
];
exports.navigatableComponents = [
    start_component_1.StartComponent,
    groupTypeSelector_component_1.GroupTypeSelectorComponent,
    playerCreator_component_1.PlayerCreatorComponent,
    groupSelector_component_1.GroupSelectorComponent,
    modeSelector_component_1.ModeSelectorComponent,
    teamBuilder_component_1.TeamBuilderComponent,
    subjectSelector_component_1.SubjectSelectorComponent,
    questionPresenter_component_1.QuestionPresenterComponent,
    questionPreAnswer_component_1.QuestionPreAnswerComponent,
    answer_component_1.AnswerComponent,
    answerValidation_component_1.AnswerValidationComponent,
    summary_component_1.SummaryComponent,
    creating_listview_component_1.CreatingListViewComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLGlFQUErRDtBQUMvRCxxR0FBbUc7QUFDbkcseUZBQXVGO0FBQ3ZGLHlGQUF1RjtBQUN2RixzRkFBb0Y7QUFDcEYsbUZBQWlGO0FBQ2pGLCtGQUE2RjtBQUM3RixxR0FBbUc7QUFDbkcscUdBQW1HO0FBQ25HLG9FQUFrRTtBQUNsRSxrR0FBZ0c7QUFDaEcsdUVBQXFFO0FBRXJFLDRGQUF1RjtBQUkxRSxRQUFBLE1BQU0sR0FBRztJQUNsQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQ3JELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUM1QyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsd0RBQTBCLEVBQUU7SUFDcEUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxnREFBc0IsRUFBRTtJQUM1RCxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLGdEQUFzQixFQUFFO0lBQzVELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsOENBQXFCLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSw0Q0FBb0IsRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsb0RBQXdCLEVBQUU7SUFDaEUsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLHdEQUEwQixFQUFFO0lBQ3hFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSx3REFBMEIsRUFBRTtJQUNwRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGtDQUFlLEVBQUU7SUFDOUMsRUFBRSxJQUFJLEVBQUUsbUNBQW1DLEVBQUUsU0FBUyxFQUFFLHNEQUF5QixFQUFFO0lBQ25GLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsb0NBQWdCLEVBQUU7SUFFaEQsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLHVEQUF5QixFQUFFO0NBQ3JFLENBQUM7QUFFVyxRQUFBLHFCQUFxQixHQUFHO0lBQ2pDLGdDQUFjO0lBQ2Qsd0RBQTBCO0lBQzFCLGdEQUFzQjtJQUN0QixnREFBc0I7SUFDdEIsOENBQXFCO0lBQ3JCLDRDQUFvQjtJQUNwQixvREFBd0I7SUFDeEIsd0RBQTBCO0lBQzFCLHdEQUEwQjtJQUMxQixrQ0FBZTtJQUNmLHNEQUF5QjtJQUN6QixvQ0FBZ0I7SUFFaEIsdURBQXlCO0NBQzVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IFN0YXJ0Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvc3RhcnQvc3RhcnQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBHcm91cFR5cGVTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2dyb3VwVHlwZVNlbGVjdG9yL2dyb3VwVHlwZVNlbGVjdG9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUGxheWVyQ3JlYXRvckNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3BsYXllckNyZWF0b3IvcGxheWVyQ3JlYXRvci5jb21wb25lbnRcIjtcbmltcG9ydCB7IEdyb3VwU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ncm91cFNlbGVjdG9yL2dyb3VwU2VsZWN0b3IuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RlU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9tb2RlU2VsZWN0b3IvbW9kZVNlbGVjdG9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVGVhbUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy90ZWFtQnVpbGRlci90ZWFtQnVpbGRlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IFN1YmplY3RTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3N1YmplY3RTZWxlY3Rvci9zdWJqZWN0U2VsZWN0b3IuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBRdWVzdGlvblByZXNlbnRlckNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3F1ZXN0aW9uUHJlc2VudGVyL3F1ZXN0aW9uUHJlc2VudGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUXVlc3Rpb25QcmVBbnN3ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9xdWVzdGlvblByZUFuc3dlci9xdWVzdGlvblByZUFuc3dlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFuc3dlckNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2Fuc3dlci9hbnN3ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBbnN3ZXJWYWxpZGF0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvYW5zd2VyVmFsaWRhdGlvbi9hbnN3ZXJWYWxpZGF0aW9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU3VtbWFyeUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3N1bW1hcnkvc3VtbWFyeS5jb21wb25lbnRcIjtcbiBcbmltcG9ydCB7Q3JlYXRpbmdMaXN0Vmlld0NvbXBvbmVudH0gZnJvbSBcIi4vcGFnZXMvbGlzdFZpZXcvY3JlYXRpbmctbGlzdHZpZXcuY29tcG9uZW50XCI7XG5cblxuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvc3RhcnRcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LCAgICBcbiAgICB7IHBhdGg6IFwic3RhcnRcIiwgY29tcG9uZW50OiBTdGFydENvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJncm91cFR5cGVTZWxlY3RvclwiLCBjb21wb25lbnQ6IEdyb3VwVHlwZVNlbGVjdG9yQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInBsYXllckNyZWF0b3JcIiwgY29tcG9uZW50OiBQbGF5ZXJDcmVhdG9yQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcImdyb3VwU2VsZWN0b3JcIiwgY29tcG9uZW50OiBHcm91cFNlbGVjdG9yQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcIm1vZGVTZWxlY3RvclwiLCBjb21wb25lbnQ6IE1vZGVTZWxlY3RvckNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJ0ZWFtQnVpbGRlclwiLCBjb21wb25lbnQ6IFRlYW1CdWlsZGVyQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInN1YmplY3RTZWxlY3RvclwiLCBjb21wb25lbnQ6IFN1YmplY3RTZWxlY3RvckNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJxdWVzdGlvblByZXNlbnRlci86aWRcIiwgY29tcG9uZW50OiBRdWVzdGlvblByZXNlbnRlckNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJxdWVzdGlvblByZUFuc3dlclwiLCBjb21wb25lbnQ6IFF1ZXN0aW9uUHJlQW5zd2VyQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcImFuc3dlclwiLCBjb21wb25lbnQ6IEFuc3dlckNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJhbnN3ZXJWYWxpZGF0aW9uLzpjb3JyZWN0LzphbnN3ZXJcIiwgY29tcG9uZW50OiBBbnN3ZXJWYWxpZGF0aW9uQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInN1bW1hcnlcIiwgY29tcG9uZW50OiBTdW1tYXJ5Q29tcG9uZW50IH0sXG5cbiAgICB7IHBhdGg6IFwiY3JlYXRpbmdMaXN0Vmlld1wiLCBjb21wb25lbnQ6IENyZWF0aW5nTGlzdFZpZXdDb21wb25lbnQgfVxuXTtcblxuZXhwb3J0IGNvbnN0IG5hdmlnYXRhYmxlQ29tcG9uZW50cyA9IFtcbiAgICBTdGFydENvbXBvbmVudCxcbiAgICBHcm91cFR5cGVTZWxlY3RvckNvbXBvbmVudCxcbiAgICBQbGF5ZXJDcmVhdG9yQ29tcG9uZW50LFxuICAgIEdyb3VwU2VsZWN0b3JDb21wb25lbnQsXG4gICAgTW9kZVNlbGVjdG9yQ29tcG9uZW50LFxuICAgIFRlYW1CdWlsZGVyQ29tcG9uZW50LFxuICAgIFN1YmplY3RTZWxlY3RvckNvbXBvbmVudCxcbiAgICBRdWVzdGlvblByZXNlbnRlckNvbXBvbmVudCxcbiAgICBRdWVzdGlvblByZUFuc3dlckNvbXBvbmVudCxcbiAgICBBbnN3ZXJDb21wb25lbnQsXG4gICAgQW5zd2VyVmFsaWRhdGlvbkNvbXBvbmVudCxcbiAgICBTdW1tYXJ5Q29tcG9uZW50LFxuXG4gICAgQ3JlYXRpbmdMaXN0Vmlld0NvbXBvbmVudFxuXTtcblxuIl19