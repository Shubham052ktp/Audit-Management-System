import { AuditDetails } from "./AuditDetails";

export interface AuditRequest
{
    projectName:string,
    projectManagerName:string,
    applicationOwner:String,
    auditDetails:AuditDetails
}