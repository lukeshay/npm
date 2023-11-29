import {
	ACMClient,
	DeleteCertificateCommand,
	DescribeCertificateCommand,
	RequestCertificateCommand,
} from "@aws-sdk/client-acm"
import { randomUUID } from "node:crypto"

/**
 * Handles the custom resource event.
 * @param {import("aws-lambda").CdkCustomResourceEvent} event - The event.
 * @returns {Promise<import("aws-lambda").CdkCustomResourceResponse>} The response.
 */
const onEvent = async (event) => {
	const {
		alternateNames,
		domainName,
		idempotencyToken,
		region,
		validationMethod,
	} = event.ResourceProperties
	const client = new ACMClient({
		region,
	})

	if (event.RequestType === "Create" || event.RequestType === "Update") {
		const result = await client.send(
			new RequestCertificateCommand({
				DomainName: domainName,
				IdempotencyToken: idempotencyToken,
				SubjectAlternativeNames: alternateNames?.length
					? alternateNames
					: undefined,
				ValidationMethod: validationMethod,
			}),
		)

		return {
			Data: {
				alternateNames,
				certificateArn: result.CertificateArn,
				domainName,
				region,
			},
			PhysicalResourceId: result.CertificateArn,
		}
	}

	await client.send(
		new DeleteCertificateCommand({
			CertificateArn: event.PhysicalResourceId,
		}),
	)

	return {
		Data: {},
		PhysicalResourceId: randomUUID(),
	}
}

/**
 * Handles the custom resource is complete event.
 * @param {import("aws-lambda").CdkCustomResourceIsCompleteEvent} event - The event.
 * @returns {Promise<import("aws-lambda").CdkCustomResourceIsCompleteResponse>} The response.
 */
const isComplete = async (event) => {
	const client = new ACMClient({
		region: event.Data.region,
	})

	if (event.RequestType === "Create" || event.RequestType === "Update") {
		const result = await client.send(
			new DescribeCertificateCommand({
				CertificateArn: event.Data.certificateArn,
			}),
		)

		if (result.Certificate.Status === "ISSUED") {
			return {
				Data: {
					status: result.Certificate.Status,
				},
				IsComplete: true,
			}
		} else if (result.Certificate.Status === "PENDING_VALIDATION") {
			return {
				IsComplete: false,
			}
		}

		throw new Error(
			`Unexpected certificate status: ${result.Certificate.Status}`,
		)
	}

	return {
		IsComplete: true,
	}
}

export { isComplete, onEvent }
