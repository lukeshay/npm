// eslint-disable-next-line max-classes-per-file
import {
	Certificate,
	type ICertificate,
} from "aws-cdk-lib/aws-certificatemanager"
import { PolicyStatement } from "aws-cdk-lib/aws-iam"
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda"
import { CustomResource, Duration, Stack } from "aws-cdk-lib/core"
import { Provider } from "aws-cdk-lib/custom-resources"
import { Construct } from "constructs"
import * as url from "node:url"

/** @internal */
class CrossRegionCertificateProvider extends Construct {
	private readonly provider: Provider

	public constructor(scope: Construct, id: string) {
		super(scope, id)

		const code = Code.fromAsset(
			url.fileURLToPath(
				new url.URL("../../support/cross-region-certificate", import.meta.url),
			),
		)

		const onEventHandler = new Function(
			this,
			"CrossRegionCertificateProviderEventHandler",
			{
				code,
				handler: "index.onEvent",
				initialPolicy: [
					new PolicyStatement({
						actions: ["acm:RequestCertificate", "acm:DeleteCertificate"],
						resources: ["*"],
					}),
				],
				runtime: Runtime.NODEJS_20_X,
			},
		)

		const isCompleteHandler = new Function(
			this,
			"CrossRegionCertificateProviderCompleteHandler",
			{
				code,
				handler: "index.isComplete",
				initialPolicy: [
					new PolicyStatement({
						actions: ["acm:DescribeCertificate"],
						resources: ["*"],
					}),
				],
				runtime: Runtime.NODEJS_20_X,
			},
		)

		this.provider = new Provider(this, "CrossRegionCertificateProvider", {
			isCompleteHandler,
			onEventHandler,
			/* eslint-disable @typescript-eslint/no-magic-numbers */
			queryInterval: Duration.seconds(15),
			totalTimeout: Duration.minutes(20),
			/* eslint-enable @typescript-eslint/no-magic-numbers */
		})
	}

	public static getOrCreate(scope: Construct) {
		const stack = Stack.of(scope)
		const id =
			"org.astro-aws.cdk.custom-resources.cross-region-certificate-provider"
		/* eslint-disable total-functions/no-unsafe-type-assertion */
		const resource =
			(stack.node.tryFindChild(id) as
				| CrossRegionCertificateProvider
				| undefined) ?? new CrossRegionCertificateProvider(stack, id)
		/* eslint-enable total-functions/no-unsafe-type-assertion */

		return resource.provider.serviceToken
	}
}

/**
 * The validation method for the certificate.
 */
type ValidationMethod = "DNS" | "EMAIL"

/**
 * Status of the certificate.
 */
type CerticateStatus =
	| "EXPIRED"
	| "FAILED"
	| "INACTIVE"
	| "ISSUED"
	| "PENDING_VALIDATION"
	| "REVOKED"
	| "VALIDATION_TIMED_OUT"
	| undefined

/**
 * Properties for creating a {@link CrossRegionCertificate}.
 */
type CrossRegionCertificateProperties = {
	/** Additional domain names. */
	alternateNames?: string[]

	/** The primary domain name. */
	domainName: string

	/**
	 * The region to create the certificate in.
	 * @default The region of the stack.
	 */
	region?: string

	/**
	 * The method of validation to use.
	 * @default "DNS"
	 */
	validationMethod?: ValidationMethod
}

/**
 * A certificate that can be created in any region.
 */
class CrossRegionCertificate extends Construct {
	public readonly alternateNames: string[]

	public readonly certificate: ICertificate

	public readonly certificateArn: string

	public readonly domainName: string

	public readonly region: string

	public readonly status: CerticateStatus

	public constructor(
		scope: Construct,
		id: string,
		properties: CrossRegionCertificateProperties,
	) {
		super(scope, id)

		const resource = new CustomResource(this, "Resource", {
			properties: {
				alternateNames: properties.alternateNames ?? [],
				domainName: properties.domainName,
				idempotenceToken: this.node.addr,
				region: properties.region ?? Stack.of(this).region,
				validationMethod: properties.validationMethod ?? "DNS",
			},
			resourceType: "Custom::CrossRegionCertificate",
			serviceToken: CrossRegionCertificateProvider.getOrCreate(this),
		})

		this.certificateArn = resource.getAttString("certificateArn")
		this.domainName = resource.getAttString("domainName")
		this.alternateNames = resource.getAtt("alternateNames").toStringList()
		this.region = resource.getAttString("region")
		// eslint-disable-next-line total-functions/no-unsafe-type-assertion
		this.status = resource.getAttString("status") as CerticateStatus
		this.certificate = Certificate.fromCertificateArn(
			this,
			"Certificate",
			this.certificateArn,
		)
	}
}

export {
	type CerticateStatus,
	CrossRegionCertificate,
	type CrossRegionCertificateProperties,
	type ValidationMethod,
}
