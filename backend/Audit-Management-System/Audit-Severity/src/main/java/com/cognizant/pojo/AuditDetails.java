package com.cognizant.pojo;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 * 
This POJO class is for AuditDetails
 *
 */
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuditDetails {
	/**
	 * Variable auditType is used to store the type of Audit
	 */
	private String auditType;
	
	//adding this for last post request
		private List<QuestionsEntity> auditQuestions;
		
}
