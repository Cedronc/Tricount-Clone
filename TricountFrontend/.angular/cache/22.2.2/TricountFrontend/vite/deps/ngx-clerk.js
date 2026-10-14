import { Ac as Injector, Al as ɵɵdefineInjectable, Bc as PLATFORM_ID, Bt as computed, Di as provideAppInitializer, Dr as ViewEncapsulation, Er as ViewContainerRef, Fn as Injectable, In as Input, Qo as ɵɵlistener, Rc as NgZone, S as ViewChild, Tl as signal, Ul as Subject, Vl as map, Wi as setClassMetadata, X as input, _l as makeEnvironmentProviders, an as ChangeDetectionStrategy, au as __extends, bs as ɵɵqueryAdvance, ca as ɵɵInheritDefinitionFeature, cn as Component, dc as ɵɵviewQuerySignal, dl as inject, el as assertInInjectionContext, gt as viewChild, il as effect, io as ɵɵdefineDirective, jo as ɵɵgetInheritedFactory, kc as InjectionToken, lo as ɵɵdomElement, qt as untracked, ro as ɵɵdefineComponent, vc as DestroyRef, vr as TemplateRef, wn as Directive } from "./core-BtH_Lmnj.js";
import { jt as take, lt as Router } from "./router-p84HX-N0.js";
import { L as isPlatformBrowser, X as filter } from "./platform-browser-BxQWy1B7.js";
//#region node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
var dateTimestampProvider = {
	now: function() {
		return (dateTimestampProvider.delegate || Date).now();
	},
	delegate: void 0
};
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/ReplaySubject.js
var ReplaySubject = function(_super) {
	__extends(ReplaySubject, _super);
	function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
		if (_bufferSize === void 0) _bufferSize = Infinity;
		if (_windowTime === void 0) _windowTime = Infinity;
		if (_timestampProvider === void 0) _timestampProvider = dateTimestampProvider;
		var _this = _super.call(this) || this;
		_this._bufferSize = _bufferSize;
		_this._windowTime = _windowTime;
		_this._timestampProvider = _timestampProvider;
		_this._buffer = [];
		_this._infiniteTimeWindow = true;
		_this._infiniteTimeWindow = _windowTime === Infinity;
		_this._bufferSize = Math.max(1, _bufferSize);
		_this._windowTime = Math.max(1, _windowTime);
		return _this;
	}
	ReplaySubject.prototype.next = function(value) {
		var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
		if (!isStopped) {
			_buffer.push(value);
			!_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
		}
		this._trimBuffer();
		_super.prototype.next.call(this, value);
	};
	ReplaySubject.prototype._subscribe = function(subscriber) {
		this._throwIfClosed();
		this._trimBuffer();
		var subscription = this._innerSubscribe(subscriber);
		var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow;
		var copy = _a._buffer.slice();
		for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) subscriber.next(copy[i]);
		this._checkFinalizedStatuses(subscriber);
		return subscription;
	};
	ReplaySubject.prototype._trimBuffer = function() {
		var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
		var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
		_bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
		if (!_infiniteTimeWindow) {
			var now = _timestampProvider.now();
			var last = 0;
			for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) last = i;
			last && _buffer.splice(0, last + 1);
		}
	};
	return ReplaySubject;
}(Subject);
//#endregion
//#region node_modules/@clerk/shared/dist/deriveState.mjs
/**
* Derives authentication state based on the current rendering context (SSR or client-side).
*/
var deriveState = (clerkOperational, state, initialState) => {
	if (!clerkOperational && initialState) return deriveFromSsrInitialState(initialState);
	return deriveFromClientSideState(state);
};
var deriveFromSsrInitialState = (initialState) => {
	const userId = initialState.userId;
	const user = initialState.user;
	const sessionId = initialState.sessionId;
	const sessionStatus = initialState.sessionStatus;
	const sessionClaims = initialState.sessionClaims;
	return {
		userId,
		user,
		sessionId,
		session: initialState.session,
		sessionStatus,
		sessionClaims,
		organization: initialState.organization,
		orgId: initialState.orgId,
		orgRole: initialState.orgRole,
		orgPermissions: initialState.orgPermissions,
		orgSlug: initialState.orgSlug,
		actor: initialState.actor,
		factorVerificationAge: initialState.factorVerificationAge
	};
};
var deriveFromClientSideState = (state) => {
	const userId = state.user ? state.user.id : state.user;
	const user = state.user;
	const sessionId = state.session ? state.session.id : state.session;
	const session = state.session;
	const sessionStatus = state.session?.status;
	const sessionClaims = state.session ? state.session.lastActiveToken?.jwt?.claims : null;
	const factorVerificationAge = state.session ? state.session.factorVerificationAge : null;
	const actor = session?.actor;
	const organization = state.organization;
	const orgId = state.organization ? state.organization.id : state.organization;
	const orgSlug = organization?.slug;
	const membership = organization ? user?.organizationMemberships?.find((om) => om.organization.id === orgId) : organization;
	const orgPermissions = membership ? membership.permissions : membership;
	return {
		userId,
		user,
		sessionId,
		session,
		sessionStatus,
		sessionClaims,
		organization,
		orgId,
		orgRole: membership ? membership.role : membership,
		orgSlug,
		orgPermissions,
		actor,
		factorVerificationAge
	};
};
//#endregion
//#region node_modules/@clerk/shared/dist/authorization.mjs
var TYPES_TO_OBJECTS = {
	strict_mfa: {
		afterMinutes: 10,
		level: "multi_factor"
	},
	strict: {
		afterMinutes: 10,
		level: "second_factor"
	},
	moderate: {
		afterMinutes: 60,
		level: "second_factor"
	},
	lax: {
		afterMinutes: 1440,
		level: "second_factor"
	}
};
var ALLOWED_LEVELS = /* @__PURE__ */ new Set([
	"first_factor",
	"second_factor",
	"multi_factor"
]);
var ALLOWED_TYPES = /* @__PURE__ */ new Set([
	"strict_mfa",
	"strict",
	"moderate",
	"lax"
]);
var ORG_SCOPES = /* @__PURE__ */ new Set([
	"o",
	"org",
	"organization"
]);
var USER_SCOPES = /* @__PURE__ */ new Set(["u", "user"]);
var isValidMaxAge = (maxAge) => typeof maxAge === "number" && maxAge > 0;
var isValidLevel = (level) => ALLOWED_LEVELS.has(level);
var isValidVerificationType = (type) => ALLOWED_TYPES.has(type);
var isValidFactorAge = (x) => typeof x === "number" && Number.isFinite(x) && (x === -1 || x >= 0);
var prefixWithOrg = (value) => value.replace(/^(org:)*/, "org:");
/**
* Checks if a user has the required organization-level authorization.
* If both role and permission are provided, both must match (AND).
*/
var checkOrgAuthorization = (params, options) => {
	const { orgId, orgRole, orgPermissions } = options;
	const roleAsked = params.role !== void 0;
	const permissionAsked = params.permission !== void 0;
	if (!roleAsked && !permissionAsked) return "skip";
	if (roleAsked && typeof params.role !== "string") return "fail";
	if (permissionAsked && typeof params.permission !== "string") return "fail";
	if (!orgId) return "fail";
	if (roleAsked) {
		if (typeof orgRole !== "string" || !orgRole) return "fail";
		if (prefixWithOrg(orgRole) !== prefixWithOrg(params.role)) return "fail";
	}
	if (permissionAsked) {
		if (!Array.isArray(orgPermissions)) return "fail";
		if (!orgPermissions.includes(prefixWithOrg(params.permission))) return "fail";
	}
	return "pass";
};
var checkForFeatureOrPlan = (claim, featureOrPlan) => {
	const { org: orgFeatures, user: userFeatures } = splitByScope(claim);
	const [rawScope, rawId] = featureOrPlan.split(":");
	const hasExplicitScope = rawId !== void 0;
	const scope = rawScope;
	const id = rawId || rawScope;
	if (hasExplicitScope && !ORG_SCOPES.has(scope) && !USER_SCOPES.has(scope)) throw new Error(`Invalid scope: ${scope}`);
	if (hasExplicitScope) {
		if (ORG_SCOPES.has(scope)) return orgFeatures.includes(id);
		if (USER_SCOPES.has(scope)) return userFeatures.includes(id);
	}
	return [...orgFeatures, ...userFeatures].includes(id);
};
/**
* Checks if a user is entitled to the requested feature or plan.
* If both feature and plan are provided, both must match (AND).
*/
var checkBillingAuthorization = (params, options) => {
	const { features, plans } = options;
	const featureAsked = params.feature !== void 0;
	const planAsked = params.plan !== void 0;
	if (!featureAsked && !planAsked) return "skip";
	if (featureAsked && typeof params.feature !== "string") return "fail";
	if (planAsked && typeof params.plan !== "string") return "fail";
	if (featureAsked) {
		if (typeof features !== "string" || !features) return "fail";
		try {
			if (!checkForFeatureOrPlan(features, params.feature)) return "fail";
		} catch {
			return "fail";
		}
	}
	if (planAsked) {
		if (typeof plans !== "string" || !plans) return "fail";
		try {
			if (!checkForFeatureOrPlan(plans, params.plan)) return "fail";
		} catch {
			return "fail";
		}
	}
	return "pass";
};
var splitByScope = (fea) => {
	const org = [];
	const user = [];
	if (!fea) return {
		org,
		user
	};
	const parts = fea.split(",");
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i].trim();
		const colonIndex = part.indexOf(":");
		if (colonIndex === -1) throw new Error(`Invalid claim element (missing colon): ${part}`);
		const scope = part.slice(0, colonIndex);
		const value = part.slice(colonIndex + 1);
		if (scope === "o") org.push(value);
		else if (scope === "u") user.push(value);
		else if (scope === "ou" || scope === "uo") {
			org.push(value);
			user.push(value);
		}
	}
	return {
		org,
		user
	};
};
var validateReverificationConfig = (config) => {
	if (!config) return false;
	const convertConfigToObject = (config) => {
		if (typeof config === "string") return TYPES_TO_OBJECTS[config];
		return config;
	};
	const isValidStringValue = typeof config === "string" && isValidVerificationType(config);
	const isValidObjectValue = typeof config === "object" && isValidLevel(config.level) && isValidMaxAge(config.afterMinutes);
	if (isValidStringValue || isValidObjectValue) return convertConfigToObject.bind(null, config);
	return false;
};
/**
* Evaluates if the user meets re-verification authentication requirements.
* Handles different verification levels (first factor, second factor, multi-factor).
*/
var checkReverificationAuthorization = (params, { factorVerificationAge }) => {
	if (params.reverification === void 0) return "skip";
	if (!factorVerificationAge) return "fail";
	if (!Array.isArray(factorVerificationAge) || factorVerificationAge.length !== 2 || !isValidFactorAge(factorVerificationAge[0]) || !isValidFactorAge(factorVerificationAge[1])) return "fail";
	const getConfig = validateReverificationConfig(params.reverification);
	if (!getConfig) return "fail";
	const { level, afterMinutes } = getConfig();
	const [factor1Age, factor2Age] = factorVerificationAge;
	if (factor1Age === -1 && factor2Age === -1) return "fail";
	const factor1FreshEnough = factor1Age !== -1 && afterMinutes > factor1Age;
	const factor2FreshEnough = factor2Age !== -1 && afterMinutes > factor2Age;
	switch (level) {
		case "first_factor": return factor1FreshEnough ? "pass" : "fail";
		case "second_factor":
			if (factor2Age === -1) return factor1FreshEnough ? "pass" : "fail";
			if (factor1Age === -1) return factor2FreshEnough ? "pass" : "fail";
			return factor2FreshEnough ? "pass" : "fail";
		case "multi_factor":
			if (factor2Age === -1) return factor1FreshEnough ? "pass" : "fail";
			if (factor1Age === -1) return "fail";
			return factor1FreshEnough && factor2FreshEnough ? "pass" : "fail";
	}
};
var combine = (results) => results.some((r) => r === "pass") && results.every((r) => r === "pass" || r === "skip");
/**
* Creates a function for comprehensive user authorization checks.
* Combines organization, billing, and reverification checks. The returned function
* authorizes only when every requested dimension passes; any requested dimension
* that cannot be satisfied (including missing or malformed session data) denies
* the request. Fails if `userId` is missing.
*/
var createCheckAuthorization = (options) => {
	return (params) => {
		if (!options.userId) return false;
		return combine([
			checkOrgAuthorization(params, options),
			checkBillingAuthorization(params, options),
			checkReverificationAuthorization(params, options)
		]);
	};
};
//#endregion
//#region node_modules/@clerk/shared/dist/constants.mjs
var DEV_OR_STAGING_SUFFIXES = [
	".lcl.dev",
	".stg.dev",
	".lclstage.dev",
	".stgstage.dev",
	".dev.lclclerk.com",
	".stg.lclclerk.com",
	".accounts.lclclerk.com",
	"accountsstage.dev",
	"accounts.dev"
];
//#endregion
//#region node_modules/@clerk/shared/dist/_chunks/keySetupGuidance-NjzfRCzi.mjs
var existingAppSteps = `To use an existing Clerk app, run:
npx clerk@latest link
npx clerk@latest env pull

For production keys, run:
npx clerk@latest env pull --instance prod`;
var dashboardFallback = `Or copy keys from https://dashboard.clerk.com/~/api-keys into your .env file.`;
var keySetupGuidance = `To create a new Clerk app, run:
npx clerk@latest init

'npx clerk@latest init' does not need a Clerk account and writes temporary dev keys.

${existingAppSteps}

${dashboardFallback}`;
var existingAppKeyGuidance = `${existingAppSteps}

${dashboardFallback}`;
//#endregion
//#region node_modules/@clerk/shared/dist/isomorphicAtob.mjs
/**
* A function that decodes a string of data which has been encoded using base-64 encoding.
* Uses `atob` if available, otherwise uses `Buffer` from `globalThis`. If neither are available, returns the data as-is.
*/
var isomorphicAtob = (data) => {
	if (typeof atob !== "undefined" && typeof atob === "function") return atob(data);
	else if (typeof globalThis.Buffer !== "undefined") return globalThis.Buffer.from(data, "base64").toString();
	return data;
};
//#endregion
//#region node_modules/@clerk/shared/dist/keys.mjs
/** Prefix used for production publishable keys */
var PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
/** Prefix used for development publishable keys */
var PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
/**
* Validates that a decoded publishable key has the correct format.
* The decoded value should be a frontend API followed by exactly one '$' at the end.
*
* @param decoded - The decoded publishable key string to validate.
* @returns `true` if the decoded key has valid format, `false` otherwise.
*/
function isValidDecodedPublishableKey(decoded) {
	if (!decoded.endsWith("$")) return false;
	const withoutTrailing = decoded.slice(0, -1);
	if (withoutTrailing.includes("$")) return false;
	return withoutTrailing.includes(".");
}
/**
* Parses and validates a publishable key, extracting the frontend API and instance type.
*
* @param key - The publishable key to parse.
* @param options - Configuration options for parsing.
* @param options.fatal
* @param options.domain
* @param options.proxyUrl
* @param options.isSatellite
* @returns Parsed publishable key object with instanceType and frontendApi, or null if invalid.
*
* @throws {Error} When options.fatal is true and key is missing or invalid.
*/
function parsePublishableKey(key, options = {}) {
	key = key || "";
	if (!key || !isPublishableKey(key)) {
		if (options.fatal && !key) throw new Error(`Publishable key is missing.\n\n${keySetupGuidance}`);
		if (options.fatal && !isPublishableKey(key)) throw new Error(`Publishable key not valid (expected format: pk_test_... or pk_live_...).\n\n${keySetupGuidance}`);
		return null;
	}
	const instanceType = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
	let decodedFrontendApi;
	try {
		decodedFrontendApi = isomorphicAtob(key.split("_")[2]);
	} catch {
		if (options.fatal) throw new Error(`Publishable key not valid: Failed to decode key.\n\n${keySetupGuidance}`);
		return null;
	}
	if (!isValidDecodedPublishableKey(decodedFrontendApi)) {
		if (options.fatal) throw new Error(`Publishable key not valid: Decoded key has invalid format.\n\n${keySetupGuidance}`);
		return null;
	}
	let frontendApi = decodedFrontendApi.slice(0, -1);
	if (options.proxyUrl) frontendApi = options.proxyUrl;
	else if (instanceType !== "development" && options.domain && options.isSatellite) frontendApi = `clerk.${options.domain}`;
	return {
		instanceType,
		frontendApi
	};
}
/**
* Checks if the provided key is a valid publishable key.
*
* @param key - The key to be checked. Defaults to an empty string if not provided.
* @returns `true` if 'key' is a valid publishable key, `false` otherwise.
*/
function isPublishableKey(key = "") {
	try {
		if (!(key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key.startsWith(PUBLISHABLE_KEY_TEST_PREFIX))) return false;
		const parts = key.split("_");
		if (parts.length !== 3) return false;
		const encodedPart = parts[2];
		if (!encodedPart) return false;
		return isValidDecodedPublishableKey(isomorphicAtob(encodedPart));
	} catch {
		return false;
	}
}
/**
* Creates a memoized cache for checking if URLs are development or staging environments.
* Uses a Map to cache results for better performance on repeated checks.
*
* @returns An object with an isDevOrStagingUrl method that checks if a URL is dev/staging.
*/
function createDevOrStagingUrlCache() {
	const devOrStagingUrlCache = /* @__PURE__ */ new Map();
	return { 
	/**
	* Checks if a URL is a development or staging environment.
	*
	* @param url - The URL to check (string or URL object).
	* @returns `true` if the URL is a development or staging environment, `false` otherwise.
	*/
isDevOrStagingUrl: (url) => {
		if (!url) return false;
		const hostname = typeof url === "string" ? url : url.hostname;
		let res = devOrStagingUrlCache.get(hostname);
		if (res === void 0) {
			res = DEV_OR_STAGING_SUFFIXES.some((s) => hostname.endsWith(s));
			devOrStagingUrlCache.set(hostname, res);
		}
		return res;
	} };
}
//#endregion
//#region node_modules/@clerk/shared/dist/_chunks/clerkRuntimeError-DlesLWqO.mjs
/**
* Creates a type guard function for any error class.
* The returned function can be called as a standalone function or as a method on an error object.
*
* @example
* ```typescript
* class MyError extends Error {}
* const isMyError = createErrorTypeGuard(MyError);
*
* // As a standalone function
* if (isMyError(error)) { ... }
*
* // As a method (when attached to error object)
* if (error.isMyError()) { ... }
* ```
*/
function createErrorTypeGuard(ErrorClass) {
	function typeGuard(error) {
		const target = error ?? this;
		if (!target) throw new TypeError(`${ErrorClass.kind || ErrorClass.name} type guard requires an error object`);
		if (ErrorClass.kind && typeof target === "object" && target !== null && "constructor" in target) {
			if (target.constructor?.kind === ErrorClass.kind) return true;
		}
		return target instanceof ErrorClass;
	}
	return typeGuard;
}
var ClerkError = class ClerkError extends Error {
	static kind = "ClerkError";
	clerkError = true;
	code;
	longMessage;
	docsUrl;
	cause;
	get name() {
		return this.constructor.name;
	}
	constructor(opts) {
		super(new.target.formatMessage(new.target.kind, opts.message, opts.code, opts.docsUrl), { cause: opts.cause });
		Object.setPrototypeOf(this, ClerkError.prototype);
		this.code = opts.code;
		this.docsUrl = opts.docsUrl;
		this.longMessage = opts.longMessage;
		this.cause = opts.cause;
	}
	toString() {
		return `[${this.name}]\nMessage:${this.message}`;
	}
	static formatMessage(name, msg, code, docsUrl) {
		const prefix = "Clerk:";
		const regex = new RegExp(prefix.replace(" ", "\\s*"), "i");
		msg = msg.replace(regex, "");
		msg = `${prefix} ${msg.trim()}\n\n(code="${code}")\n\n`;
		if (docsUrl) msg += `\n\nDocs: ${docsUrl}`;
		return msg;
	}
};
/**
* Custom error class for representing Clerk runtime errors.
*
* @class ClerkRuntimeError
*
* @example
*   throw new ClerkRuntimeError('An error occurred', { code: 'password_invalid' });
*/
var ClerkRuntimeError = class ClerkRuntimeError extends ClerkError {
	static kind = "ClerkRuntimeError";
	/**
	* @deprecated Use `clerkError` property instead. This property is maintained for backward compatibility.
	*/
	clerkRuntimeError = true;
	constructor(message, options) {
		super({
			...options,
			message
		});
		Object.setPrototypeOf(this, ClerkRuntimeError.prototype);
	}
};
/**
* Type guard to check if an error is a ClerkRuntimeError.
* Can be called as a standalone function or as a method on an error object.
*
* @example
* // As a standalone function
* if (isClerkRuntimeError(error)) { ... }
*
* // As a method (when attached to error object)
* if (error.isClerkRuntimeError()) { ... }
*/
var isClerkRuntimeError = createErrorTypeGuard(ClerkRuntimeError);
//#endregion
//#region node_modules/@clerk/shared/dist/_chunks/error-DXioMHds.mjs
/**
* This error contains the specific error message, code, and any additional metadata that was returned by the Clerk API.
*/
var ClerkAPIError = class {
	static kind = "ClerkAPIError";
	code;
	message;
	longMessage;
	meta;
	constructor(json) {
		const parsedError = {
			code: json.code,
			message: json.message,
			longMessage: json.long_message,
			meta: {
				paramName: json.meta?.param_name,
				sessionId: json.meta?.session_id,
				emailAddresses: json.meta?.email_addresses,
				identifiers: json.meta?.identifiers,
				zxcvbn: json.meta?.zxcvbn,
				plan: json.meta?.plan,
				isPlanUpgradePossible: json.meta?.is_plan_upgrade_possible,
				seatsQuantityToAdd: json.meta?.seats_quantity_to_add,
				seatsQuantity: json.meta?.seats_quantity,
				traceId: json.meta?.trace_id,
				kind: json.meta?.kind,
				title: json.meta?.title,
				description: json.meta?.description,
				linkUrl: json.meta?.link_url,
				linkText: json.meta?.link_text,
				data: json.meta?.data
			}
		};
		this.code = parsedError.code;
		this.message = parsedError.message;
		this.longMessage = parsedError.longMessage;
		this.meta = parsedError.meta;
	}
};
var ClerkAPIResponseError = class ClerkAPIResponseError extends ClerkError {
	static kind = "ClerkAPIResponseError";
	status;
	clerkTraceId;
	retryAfter;
	errors;
	constructor(message, options) {
		const { data: errorsJson, status, clerkTraceId, retryAfter } = options;
		super({
			...options,
			message,
			code: "api_response_error"
		});
		Object.setPrototypeOf(this, ClerkAPIResponseError.prototype);
		this.status = status;
		this.clerkTraceId = clerkTraceId;
		this.retryAfter = retryAfter;
		this.errors = (errorsJson || []).map((e) => new ClerkAPIError(e));
	}
	toString() {
		let message = `[${this.name}]\nMessage:${this.message}\nStatus:${this.status}\nSerialized errors: ${this.errors.map((e) => JSON.stringify(e))}`;
		if (this.clerkTraceId) message += `\nClerk Trace ID: ${this.clerkTraceId}`;
		return message;
	}
	static formatMessage(name, msg, _, __) {
		return msg;
	}
};
/**
* Type guard to check if an error is a ClerkAPIResponseError.
* Can be called as a standalone function or as a method on an error object.
*
* @example
* // As a standalone function
* if (isClerkAPIResponseError(error)) { ... }
*
* // As a method (when attached to error object)
* if (error.isClerkAPIResponseError()) { ... }
*/
var isClerkAPIResponseError = createErrorTypeGuard(ClerkAPIResponseError);
/**
* Error thrown when a network request fails due to the client being offline.
*
* This error is thrown instead of returning `null` to make it explicit that
* the failure was due to network conditions, not authentication state.
*
* @example
* ```typescript
* try {
*   const token = await session.getToken();
* } catch (error) {
*   if (ClerkOfflineError.is(error)) {
*     // Handle offline scenario
*     showOfflineScreen();
*   }
* }
* ```
*/
var ClerkOfflineError = class ClerkOfflineError extends ClerkRuntimeError {
	static kind = "ClerkOfflineError";
	static ERROR_CODE = "clerk_offline";
	constructor(message) {
		super(message, { code: ClerkOfflineError.ERROR_CODE });
		Object.setPrototypeOf(this, ClerkOfflineError.prototype);
	}
	/**
	* Type guard to check if an error is a ClerkOfflineError.
	* This checks both instanceof and the error code to support cross-bundle/cross-realm errors
	*
	* @example
	* ```typescript
	* try {
	*   const token = await session.getToken();
	* } catch (error) {
	*   if (ClerkOfflineError.is(error)) {
	*     // error is typed as ClerkOfflineError
	*     console.log('User is offline');
	*   }
	* }
	* ```
	*/
	static is(error) {
		if (error === null || error === void 0) return false;
		return error instanceof ClerkOfflineError || isClerkRuntimeError(error) && error.code === ClerkOfflineError.ERROR_CODE;
	}
};
var DefaultMessages = Object.freeze({
	InvalidProxyUrlErrorMessage: `The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})`,
	InvalidPublishableKeyErrorMessage: `The publishableKey passed to Clerk is invalid (key={{key}}, expected format: pk_test_... or pk_live_...).

${keySetupGuidance}`,
	MissingPublishableKeyErrorMessage: `Clerk keys are missing from your environment.

${keySetupGuidance}`,
	MissingSecretKeyErrorMessage: `Missing secretKey.

${existingAppKeyGuidance}`,
	MissingClerkProvider: `{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider`
});
/**
* Builds an error thrower.
*
* @internal
*/
function buildErrorThrower({ packageName, customMessages }) {
	let pkg = packageName;
	/**
	* Builds a message from a raw message and replacements.
	*
	* @internal
	*/
	function buildMessage(rawMessage, replacements) {
		if (!replacements) return `${pkg}: ${rawMessage}`;
		let msg = rawMessage;
		const matches = rawMessage.matchAll(/{{([a-zA-Z0-9-_]+)}}/g);
		for (const match of matches) {
			const replacement = (replacements[match[1]] || "").toString();
			msg = msg.replace(`{{${match[1]}}}`, replacement);
		}
		return `${pkg}: ${msg}`;
	}
	const messages = {
		...DefaultMessages,
		...customMessages
	};
	return {
		setPackageName({ packageName }) {
			if (typeof packageName === "string") pkg = packageName;
			return this;
		},
		setMessages({ customMessages }) {
			Object.assign(messages, customMessages || {});
			return this;
		},
		throwInvalidPublishableKeyError(params) {
			throw new Error(buildMessage(messages.InvalidPublishableKeyErrorMessage, params));
		},
		throwInvalidProxyUrl(params) {
			throw new Error(buildMessage(messages.InvalidProxyUrlErrorMessage, params));
		},
		throwMissingPublishableKeyError() {
			throw new Error(buildMessage(messages.MissingPublishableKeyErrorMessage));
		},
		throwMissingSecretKeyError() {
			throw new Error(buildMessage(messages.MissingSecretKeyErrorMessage));
		},
		throwMissingClerkProviderError(params) {
			throw new Error(buildMessage(messages.MissingClerkProvider, params));
		},
		throw(message) {
			throw new Error(buildMessage(message));
		}
	};
}
var EmailLinkErrorCodeStatus = {
	Expired: "expired",
	Failed: "failed",
	ClientMismatch: "client_mismatch"
};
/**
* Checks if the provided error is either a ClerkAPIResponseError, a ClerkRuntimeError, or a MetamaskError.
*/
function isKnownError(error) {
	return isClerkAPIResponseError(error) || isMetamaskError(error) || isClerkRuntimeError(error);
}
/**
* Checks if the provided error is a Metamask error.
*/
function isMetamaskError(err) {
	return "code" in err && [
		4001,
		32602,
		32603
	].includes(err.code) && "message" in err;
}
/**
* Checks if the provided error is an EmailLinkError.
*/
function isEmailLinkError(err) {
	return err.name === "EmailLinkError";
}
//#endregion
//#region node_modules/@clerk/shared/dist/retry.mjs
var defaultOptions = {
	initialDelay: 125,
	maxDelayBetweenRetries: 0,
	factor: 2,
	shouldRetry: (_, iteration) => iteration < 5,
	retryImmediately: false,
	jitter: true
};
var RETRY_IMMEDIATELY_DELAY = 100;
var sleep = async (ms) => new Promise((s) => setTimeout(s, ms));
var applyJitter = (delay, jitter) => {
	return jitter ? delay * (1 + Math.random()) : delay;
};
var createExponentialDelayAsyncFn = (opts) => {
	let timesCalled = 0;
	const calculateDelayInMs = () => {
		const constant = opts.initialDelay;
		const base = opts.factor;
		let delay = constant * Math.pow(base, timesCalled);
		delay = applyJitter(delay, opts.jitter);
		return Math.min(opts.maxDelayBetweenRetries || delay, delay);
	};
	return async () => {
		await sleep(calculateDelayInMs());
		timesCalled++;
	};
};
/**
* Retries a callback until it succeeds or the shouldRetry function returns false.
* See {@link RetryOptions} for the available options.
*/
var retry = async (callback, options = {}) => {
	let iterations = 0;
	const { shouldRetry, initialDelay, maxDelayBetweenRetries, factor, retryImmediately, jitter, onBeforeRetry } = {
		...defaultOptions,
		...options
	};
	const delay = createExponentialDelayAsyncFn({
		initialDelay,
		maxDelayBetweenRetries,
		factor,
		jitter
	});
	while (true) try {
		return await callback();
	} catch (e) {
		iterations++;
		if (!shouldRetry(e, iterations)) throw e;
		if (onBeforeRetry) await onBeforeRetry(iterations);
		if (retryImmediately && iterations === 1) await sleep(applyJitter(RETRY_IMMEDIATELY_DELAY, jitter));
		else await delay();
	}
};
//#endregion
//#region node_modules/@clerk/shared/dist/loadScript.mjs
var NO_DOCUMENT_ERROR = "loadScript cannot be called when document does not exist";
var NO_SRC_ERROR = "loadScript cannot be called without a src";
/**
*
*/
async function loadScript(src = "", opts) {
	const { async, defer, beforeLoad, crossOrigin, nonce } = opts || {};
	const load = () => {
		return new Promise((resolve, reject) => {
			if (!src) reject(/* @__PURE__ */ new Error(NO_SRC_ERROR));
			if (!document || !document.body) reject(/* @__PURE__ */ new Error(NO_DOCUMENT_ERROR));
			const script = document.createElement("script");
			if (crossOrigin) script.setAttribute("crossorigin", crossOrigin);
			script.async = async || false;
			script.defer = defer || false;
			script.addEventListener("load", () => {
				script.remove();
				resolve(script);
			});
			script.addEventListener("error", (event) => {
				script.remove();
				reject(event.error ?? /* @__PURE__ */ new Error(`failed to load script: ${src}`));
			});
			script.src = src;
			if (nonce) script.nonce = nonce;
			beforeLoad?.(script);
			document.body.appendChild(script);
		});
	};
	return retry(load, { shouldRetry: (_, iterations) => {
		return iterations <= 5;
	} });
}
//#endregion
//#region node_modules/@clerk/shared/dist/proxy.mjs
/**
*
*/
function isValidProxyUrl(key) {
	if (!key) return true;
	return isHttpOrHttps(key) || isProxyUrlRelative(key);
}
/**
*
*/
function isHttpOrHttps(key) {
	return /^http(s)?:\/\//.test(key || "");
}
/**
*
*/
function isProxyUrlRelative(key) {
	return key.startsWith("/");
}
/**
*
*/
function proxyUrlToAbsoluteURL(url) {
	if (!url) return "";
	if (!isProxyUrlRelative(url)) return url;
	if (typeof window === "undefined" || !window.location?.origin) return url;
	return new URL(url, window.location.origin).toString();
}
//#endregion
//#region node_modules/@clerk/shared/dist/url.mjs
/**
*
*/
function addClerkPrefix(str) {
	if (!str) return "";
	let regex;
	if (str.match(/^(clerk\.)+\w*$/)) regex = /(clerk\.)*(?=clerk\.)/;
	else if (str.match(/\.clerk.accounts/)) return str;
	else regex = /^(clerk\.)*/gi;
	return `clerk.${str.replace(regex, "")}`;
}
var createDynamicParamParser = ({ regex }) => ({ urlWithParam, entity }) => {
	const match = regex.exec(urlWithParam);
	if (match) {
		const key = match[1];
		if (key in entity) {
			const value = entity[key];
			return urlWithParam.replace(match[0], value);
		}
	}
	return urlWithParam;
};
createDynamicParamParser({ regex: /:(\w+)/ });
//#endregion
//#region node_modules/@clerk/shared/dist/versionSelector.mjs
/**
* This version selector is a bit complicated, so here is the flow:
* 1. Use the clerkJSVersion prop on the provider
* 2. Use the exact `@clerk/clerk-js` version if it is a `@snapshot` prerelease
* 3. Use the prerelease tag of `@clerk/clerk-js` or the packageVersion provided
* 4. Fallback to the major version of `@clerk/clerk-js` or the packageVersion provided
*
* @param clerkJSVersion - The optional clerkJSVersion prop on the provider
* @param packageVersion - The version of `@clerk/clerk-js` that will be used if an explicit version is not provided
* @returns The npm tag, version or major version to use
*/
var versionSelector = (clerkJSVersion, packageVersion = "6.39.0") => {
	if (clerkJSVersion) return clerkJSVersion;
	const prereleaseTag = getPrereleaseTag(packageVersion);
	if (prereleaseTag) {
		if (prereleaseTag === "snapshot") return packageVersion;
		return prereleaseTag;
	}
	return getMajorVersion(packageVersion);
};
var getPrereleaseTag = (packageVersion) => packageVersion.trim().replace(/^v/, "").match(/-(.+?)(\.|$)/)?.[1];
var getMajorVersion = (packageVersion) => packageVersion.trim().replace(/^v/, "").split(".")[0];
//#endregion
//#region node_modules/@clerk/shared/dist/loadClerkJsScript.mjs
var { isDevOrStagingUrl } = createDevOrStagingUrlCache();
var errorThrower = buildErrorThrower({ packageName: "@clerk/shared" });
/**
* Validates that window.Clerk exists and is properly initialized.
* This ensures we don't have false positives where the script loads but Clerk is malformed.
*
* @returns `true` if window.Clerk exists and has the expected structure with a load method.
*/
function isClerkGlobalProperlyLoaded(prop) {
	if (typeof window === "undefined" || !window[prop]) return false;
	return !!window[prop];
}
var isClerkProperlyLoaded = () => isClerkGlobalProperlyLoaded("Clerk");
var isClerkUIProperlyLoaded = () => isClerkGlobalProperlyLoaded("__internal_ClerkUICtor");
/**
* Checks if an existing script has a request error using Performance API.
*
* @param scriptUrl - The URL of the script to check.
* @returns True if the script has failed to load due to a network/HTTP error.
*/
function hasScriptRequestError(scriptUrl) {
	if (typeof window === "undefined" || !window.performance) return false;
	const entries = performance.getEntriesByName(scriptUrl, "resource");
	if (entries.length === 0) return false;
	const scriptEntry = entries[entries.length - 1];
	if (scriptEntry.transferSize === 0 && scriptEntry.decodedBodySize === 0) {
		if (scriptEntry.responseEnd === 0) return true;
		if (scriptEntry.responseEnd > 0 && scriptEntry.responseStart > 0) return true;
		if ("responseStatus" in scriptEntry) {
			if (scriptEntry.responseStatus >= 400) return true;
			if (scriptEntry.responseStatus === 0) return true;
		}
	}
	return false;
}
/**
* Hotloads the Clerk JS script with robust failure detection.
*
* Uses a timeout-based approach to ensure absolute certainty about load success/failure.
* If the script fails to load within the timeout period, or loads but doesn't create
* a proper Clerk instance, the promise rejects with an error.
*
* @param opts - The options used to build the Clerk JS script URL and load the script.
*               Must include a `publishableKey` if no existing script is found.
* @returns Promise that resolves with null if Clerk loads successfully, or rejects with an error.
*
* @example
* ```typescript
* try {
*   await loadClerkJsScript({ publishableKey: 'pk_test_...' });
*   console.log('Clerk loaded successfully');
* } catch (error) {
*   console.error('Failed to load Clerk:', error.message);
* }
* ```
*/
var loadClerkJSScript = async (opts) => {
	const timeout = opts?.scriptLoadTimeout ?? 15e3;
	const rejectWith = (error) => new ClerkRuntimeError("Failed to load Clerk JS" + (error?.message ? `, ${error.message}` : ""), {
		code: "failed_to_load_clerk_js",
		cause: error
	});
	if (isClerkProperlyLoaded()) return null;
	if (!opts?.publishableKey) {
		errorThrower.throwMissingPublishableKeyError();
		return null;
	}
	const scriptUrl = clerkJSScriptUrl(opts);
	const existingScript = document.querySelector("script[data-clerk-js-script]");
	if (existingScript) if (hasScriptRequestError(scriptUrl)) existingScript.remove();
	else try {
		await waitForPredicateWithTimeout(timeout, isClerkProperlyLoaded, rejectWith(), existingScript);
		return null;
	} catch {
		existingScript.remove();
	}
	const loadPromise = waitForPredicateWithTimeout(timeout, isClerkProperlyLoaded, rejectWith());
	loadScript(scriptUrl, {
		async: true,
		crossOrigin: "anonymous",
		nonce: opts.nonce,
		beforeLoad: applyAttributesToScript(buildClerkJSScriptAttributes(opts))
	}).catch((error) => {
		throw rejectWith(error);
	});
	return loadPromise;
};
var loadClerkUIScript = async (opts) => {
	const timeout = opts?.scriptLoadTimeout ?? 15e3;
	const rejectWith = (error) => new ClerkRuntimeError("Failed to load Clerk UI" + (error?.message ? `, ${error.message}` : ""), {
		code: "failed_to_load_clerk_ui",
		cause: error
	});
	if (isClerkUIProperlyLoaded()) return null;
	if (!opts?.publishableKey) {
		errorThrower.throwMissingPublishableKeyError();
		return null;
	}
	const scriptUrl = clerkUIScriptUrl(opts);
	const existingScript = document.querySelector("script[data-clerk-ui-script]");
	if (existingScript) if (hasScriptRequestError(scriptUrl)) existingScript.remove();
	else try {
		await waitForPredicateWithTimeout(timeout, isClerkUIProperlyLoaded, rejectWith(), existingScript);
		return null;
	} catch {
		existingScript.remove();
	}
	const loadPromise = waitForPredicateWithTimeout(timeout, isClerkUIProperlyLoaded, rejectWith());
	loadScript(scriptUrl, {
		async: true,
		crossOrigin: "anonymous",
		nonce: opts.nonce,
		beforeLoad: applyAttributesToScript(buildClerkUIScriptAttributes(opts))
	}).catch((error) => {
		throw rejectWith(error);
	});
	return loadPromise;
};
var clerkJSScriptUrl = (opts) => {
	const { __internal_clerkJSUrl, __internal_clerkJSVersion, proxyUrl, domain, publishableKey } = opts;
	if (__internal_clerkJSUrl) return __internal_clerkJSUrl;
	const version = versionSelector(__internal_clerkJSVersion);
	if (proxyUrl && isProxyUrlRelative(proxyUrl)) return buildRelativeProxyScriptUrl(proxyUrl, "clerk-js", version, "clerk.browser.js");
	return `https://${buildScriptHost({
		publishableKey,
		proxyUrl,
		domain
	})}/npm/@clerk/clerk-js@${version}/dist/clerk.browser.js`;
};
var clerkUIScriptUrl = (opts) => {
	const { __internal_clerkUIUrl, __internal_clerkUIVersion, proxyUrl, domain, publishableKey } = opts;
	if (__internal_clerkUIUrl) return __internal_clerkUIUrl;
	const version = versionSelector(__internal_clerkUIVersion, "1.40.0");
	if (proxyUrl && isProxyUrlRelative(proxyUrl)) return buildRelativeProxyScriptUrl(proxyUrl, "ui", version, "ui.browser.js");
	return `https://${buildScriptHost({
		publishableKey,
		proxyUrl,
		domain
	})}/npm/@clerk/ui@${version}/dist/ui.browser.js`;
};
var buildClerkJSScriptAttributes = (options) => {
	const obj = {};
	if (options.publishableKey) obj["data-clerk-publishable-key"] = options.publishableKey;
	if (options.proxyUrl) obj["data-clerk-proxy-url"] = options.proxyUrl;
	if (options.domain) obj["data-clerk-domain"] = options.domain;
	if (options.nonce) obj.nonce = options.nonce;
	return obj;
};
var buildClerkUIScriptAttributes = (options) => {
	return buildClerkJSScriptAttributes(options);
};
var applyAttributesToScript = (attributes) => (script) => {
	for (const attribute in attributes) script.setAttribute(attribute, attributes[attribute]);
};
var stripTrailingSlashes = (value) => {
	while (value.endsWith("/")) value = value.slice(0, -1);
	return value;
};
var buildRelativeProxyScriptUrl = (proxyUrl, packageName, version, fileName) => {
	return `${stripTrailingSlashes(proxyUrl)}/npm/@clerk/${packageName}@${version}/dist/${fileName}`;
};
var buildScriptHost = (opts) => {
	const { proxyUrl, domain, publishableKey } = opts;
	if (!!proxyUrl && isValidProxyUrl(proxyUrl)) {
		const resolvedProxyUrl = proxyUrlToAbsoluteURL(proxyUrl);
		if (isProxyUrlRelative(resolvedProxyUrl)) return parsePublishableKey(publishableKey)?.frontendApi || "";
		return resolvedProxyUrl.replace(/http(s)?:\/\//, "");
	} else if (domain && !isDevOrStagingUrl(parsePublishableKey(publishableKey)?.frontendApi || "")) return addClerkPrefix(domain);
	else return parsePublishableKey(publishableKey)?.frontendApi || "";
};
function waitForPredicateWithTimeout(timeoutMs, predicate, rejectWith, existingScript) {
	return new Promise((resolve, reject) => {
		let resolved = false;
		const cleanup = (timeoutId, pollInterval) => {
			clearTimeout(timeoutId);
			clearInterval(pollInterval);
		};
		existingScript?.addEventListener("error", () => {
			cleanup(timeoutId, pollInterval);
			reject(rejectWith);
		});
		const checkAndResolve = () => {
			if (resolved) return;
			if (predicate()) {
				resolved = true;
				cleanup(timeoutId, pollInterval);
				resolve(null);
			}
		};
		const handleTimeout = () => {
			if (resolved) return;
			resolved = true;
			cleanup(timeoutId, pollInterval);
			if (!predicate()) reject(rejectWith);
			else resolve(null);
		};
		const timeoutId = setTimeout(handleTimeout, timeoutMs);
		checkAndResolve();
		const pollInterval = setInterval(() => {
			if (resolved) {
				clearInterval(pollInterval);
				return;
			}
			checkAndResolve();
		}, 100);
	});
}
//#endregion
//#region node_modules/@angular/core/fesm2022/rxjs-interop.mjs
/**
* @license Angular v22.2.2
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
function toObservable(source, options) {
	if (ngDevMode && !options?.injector) assertInInjectionContext(toObservable);
	const injector = options?.injector ?? inject(Injector);
	const subject = new ReplaySubject(1);
	const watcher = effect(() => {
		let value;
		try {
			value = source();
		} catch (err) {
			untracked(() => subject.error(err));
			return;
		}
		untracked(() => subject.next(value));
	}, {
		injector,
		manualCleanup: true
	});
	injector.get(DestroyRef).onDestroy(() => {
		watcher.destroy();
		subject.complete();
	});
	return subject.asObservable();
}
//#endregion
//#region node_modules/ngx-clerk/fesm2022/ngx-clerk.mjs
var FAILED_TO_LOAD_ERROR = "Clerk: Failed to load Clerk";
/**
* Loads ClerkJS and ClerkUI scripts in parallel.
* Returns a promise for the ClerkUI constructor to be passed to Clerk.load().
*/
var loadClerkScripts = (opts) => {
	const { publishableKey } = opts;
	if (!publishableKey) throw new Error("ClerkService requires a publishableKey");
	const scriptOpts = {
		publishableKey,
		proxyUrl: opts.proxyUrl,
		domain: opts.domain,
		nonce: opts.nonce,
		sdkMetadata: opts.sdkMetadata,
		__internal_clerkJSUrl: opts.__internal_clerkJSUrl,
		__internal_clerkJSVersion: opts.__internal_clerkJSVersion
	};
	const uiOpts = {
		publishableKey,
		proxyUrl: opts.proxyUrl,
		domain: opts.domain,
		nonce: opts.nonce
	};
	return {
		clerkPromise: loadClerkJSScript(scriptOpts).catch(() => {
			throw new Error(FAILED_TO_LOAD_ERROR);
		}),
		clerkUICtorPromise: (async () => {
			await loadClerkUIScript(uiOpts);
			if (!window.__internal_ClerkUICtor) throw new Error("Failed to download latest Clerk UI. Contact support@clerk.com.");
			return window.__internal_ClerkUICtor;
		})()
	};
};
/**
* Core service for interacting with Clerk authentication.
* Provides reactive signals for auth state and methods for UI controls.
*
* @example
* ```ts
* const clerk = inject(ClerkService);
* const user = clerk.user();
* const isSignedIn = clerk.isSignedIn();
* ```
*/
var ClerkService = class ClerkService {
	_platformId = inject(PLATFORM_ID);
	_router = inject(Router);
	_ngZone = inject(NgZone);
	_initialized = false;
	_clerk = signal(null, ...ngDevMode ? [{ debugName: "_clerk" }] : []);
	_client = signal(null, ...ngDevMode ? [{ debugName: "_client" }] : []);
	_session = signal(null, ...ngDevMode ? [{ debugName: "_session" }] : []);
	_user = signal(null, ...ngDevMode ? [{ debugName: "_user" }] : []);
	_organization = signal(null, ...ngDevMode ? [{ debugName: "_organization" }] : []);
	/** The current Clerk instance. `null` until Clerk has loaded. */
	clerk = this._clerk.asReadonly();
	/** The current Clerk client resource. */
	client = this._client.asReadonly();
	/** The current active session. `null` when not signed in. */
	session = this._session.asReadonly();
	/** The current user. `null` when not signed in. */
	user = this._user.asReadonly();
	/** The current active organization. `null` when no organization is active. */
	organization = this._organization.asReadonly();
	/** Whether Clerk has finished loading. */
	isLoaded = computed(() => this._clerk() !== null, ...ngDevMode ? [{ debugName: "isLoaded" }] : []);
	/** Whether a user is currently signed in. */
	isSignedIn = computed(() => !!this._user()?.id, ...ngDevMode ? [{ debugName: "isSignedIn" }] : []);
	/** The current user's ID, or `null` if not signed in. */
	userId = computed(() => this._user()?.id ?? null, ...ngDevMode ? [{ debugName: "userId" }] : []);
	/** The current active organization's ID, or `null` if none is active. */
	orgId = computed(() => this._organization()?.id ?? null, ...ngDevMode ? [{ debugName: "orgId" }] : []);
	/**
	* Auth state derived from the current Clerk resources, built from the cached
	* session JWT claims.
	*/
	_derivedState = computed(() => deriveState(this.isLoaded(), {
		client: this._client(),
		session: this._session(),
		user: this._user(),
		organization: this._organization()
	}, void 0), ...ngDevMode ? [{ debugName: "_derivedState" }] : []);
	/** The active session's ID, or `null` if not signed in. */
	sessionId = computed(() => this._derivedState().sessionId ?? null, ...ngDevMode ? [{ debugName: "sessionId" }] : []);
	/** The current user's role in the active organization, or `null`. */
	orgRole = computed(() => this._derivedState().orgRole ?? null, ...ngDevMode ? [{ debugName: "orgRole" }] : []);
	/** The active organization's slug, or `null`. */
	orgSlug = computed(() => this._derivedState().orgSlug ?? null, ...ngDevMode ? [{ debugName: "orgSlug" }] : []);
	/** The claims of the active session's JWT, or `null`. */
	sessionClaims = computed(() => this._derivedState().sessionClaims ?? null, ...ngDevMode ? [{ debugName: "sessionClaims" }] : []);
	/** The actor (impersonation) claim of the active session, or `null`. */
	actor = computed(() => this._derivedState().actor ?? null, ...ngDevMode ? [{ debugName: "actor" }] : []);
	/** The active sign-in attempt resource, or `null`. */
	signIn = computed(() => this._client()?.signIn ?? null, ...ngDevMode ? [{ debugName: "signIn" }] : []);
	/** The active sign-up attempt resource, or `null`. */
	signUp = computed(() => this._client()?.signUp ?? null, ...ngDevMode ? [{ debugName: "signUp" }] : []);
	/** All sessions registered on the current client device. */
	sessions = computed(() => this._client()?.sessions ?? [], ...ngDevMode ? [{ debugName: "sessions" }] : []);
	/** The current user's membership in the active organization, or `null`. */
	membership = computed(() => {
		const orgId = this.orgId();
		const user = this._user();
		if (!orgId || !user) return null;
		return user.organizationMemberships?.find((m) => m.organization.id === orgId) ?? null;
	}, ...ngDevMode ? [{ debugName: "membership" }] : []);
	/**
	* The authorization checker for the current session, built from the cached
	* JWT claims. Returns `false` while signed out.
	*/
	_checkAuthorization = computed(() => {
		const d = this._derivedState();
		const claims = d.sessionClaims;
		return createCheckAuthorization({
			userId: d.userId,
			orgId: d.orgId,
			orgRole: d.orgRole,
			orgPermissions: d.orgPermissions,
			factorVerificationAge: d.factorVerificationAge,
			features: claims?.fea || "",
			plans: claims?.pla || ""
		});
	}, ...ngDevMode ? [{ debugName: "_checkAuthorization" }] : []);
	/**
	* Initialize ClerkJS. Called internally by provideClerk() at application startup.
	* Do not call directly -- use provideClerk() in your app config.
	*/
	initialize(options) {
		if (!isPlatformBrowser(this._platformId)) return Promise.resolve();
		if (this._initialized) {
			console.warn("ClerkService already initialized");
			return Promise.resolve();
		}
		this._initialized = true;
		const { clerkPromise, clerkUICtorPromise } = loadClerkScripts(options);
		return clerkPromise.then(async () => {
			const { publishableKey, __internal_clerkJSUrl, __internal_clerkJSVersion, ...loadOptions } = options;
			await window.Clerk.load({
				routerPush: (to) => this._ngZone.run(() => {
					const url = new URL(to.replace("#/", ""), "http://dummy.clerk");
					const queryParams = {};
					url.searchParams.forEach((v, k) => queryParams[k] = v);
					return this._router.navigate([url.pathname], { queryParams });
				}),
				routerReplace: (to) => this._ngZone.run(() => {
					const url = new URL(to.replace("#/", ""), "http://dummy.clerk");
					const queryParams = {};
					url.searchParams.forEach((v, k) => queryParams[k] = v);
					return this._router.navigate([url.pathname], {
						queryParams,
						replaceUrl: true
					});
				}),
				...loadOptions,
				ui: { ClerkUI: clerkUICtorPromise }
			});
			this._ngZone.run(() => {
				this._client.set(window.Clerk.client ?? null);
				this._session.set(window.Clerk.session ?? null);
				this._user.set(window.Clerk.user ?? null);
				this._organization.set(window.Clerk.organization ?? null);
				this._clerk.set(window.Clerk);
			});
			window.Clerk.addListener((resources) => {
				this._ngZone.run(() => {
					this._client.set(resources.client ?? null);
					this._session.set(resources.session ?? null);
					this._user.set(resources.user ?? null);
					this._organization.set(resources.organization ?? null);
					this._clerk.set(window.Clerk);
				});
			});
		});
	}
	/**
	* Checks whether the current user satisfies an authorization condition
	* (role, permission, feature, or plan). Returns `false` while signed out.
	*
	* @example
	* ```ts
	* if (clerk.has({ role: 'org:admin' })) { ... }
	* if (clerk.has({ permission: 'org:posts:manage' })) { ... }
	* ```
	*/
	has(params) {
		return this._checkAuthorization()(params);
	}
	/**
	* Returns the current session token (JWT), optionally for a named template.
	* Resolves to `null` when there is no active session.
	*/
	getToken(options) {
		const session = this._session();
		if (!session) return Promise.resolve(null);
		return session.getToken(options);
	}
	/** Sets the active session and/or organization. */
	setActive(params) {
		return this.clerk()?.setActive(params) ?? Promise.resolve();
	}
	/** Completes an OAuth/SSO redirect flow by handling the callback. */
	async handleRedirectCallback(params) {
		await this.clerk()?.handleRedirectCallback(params ?? {});
	}
	/** Updates the global appearance configuration for all Clerk components. */
	updateAppearance(opts) {
		this.clerk()?.__internal_updateProps({ appearance: opts });
	}
	/** Updates the localization configuration for all Clerk components. */
	updateLocalization(opts) {
		this.clerk()?.__internal_updateProps({ options: { localization: opts } });
	}
	/**
	* Updates Clerk's global options (localization and/or appearance) at runtime.
	*/
	updateClerkOptions(options) {
		this.clerk()?.__internal_updateProps({
			options: { localization: options.localization },
			appearance: options.appearance
		});
	}
	/** Opens the sign-in modal. */
	openSignIn(opts) {
		this.clerk()?.openSignIn(opts);
	}
	/** Closes the sign-in modal. */
	closeSignIn() {
		this.clerk()?.closeSignIn();
	}
	/** Opens the sign-up modal. */
	openSignUp(opts) {
		this.clerk()?.openSignUp(opts);
	}
	/** Closes the sign-up modal. */
	closeSignUp() {
		this.clerk()?.closeSignUp();
	}
	/** Opens the user profile modal. */
	openUserProfile(opts) {
		this.clerk()?.openUserProfile(opts);
	}
	/** Closes the user profile modal. */
	closeUserProfile() {
		this.clerk()?.closeUserProfile();
	}
	/** Opens the organization profile modal. */
	openOrganizationProfile(opts) {
		this.clerk()?.openOrganizationProfile(opts);
	}
	/** Closes the organization profile modal. */
	closeOrganizationProfile() {
		this.clerk()?.closeOrganizationProfile();
	}
	/** Opens the create organization modal. */
	openCreateOrganization(opts) {
		this.clerk()?.openCreateOrganization(opts);
	}
	/** Closes the create organization modal. */
	closeCreateOrganization() {
		this.clerk()?.closeCreateOrganization();
	}
	/** Redirects to the Clerk sign-in page. */
	redirectToSignIn(opts) {
		this.clerk()?.redirectToSignIn(opts);
	}
	/** Redirects to the Clerk sign-up page. */
	redirectToSignUp(opts) {
		this.clerk()?.redirectToSignUp(opts);
	}
	/** Signs out the current user. */
	signOut(opts) {
		return this.clerk()?.signOut(opts) ?? Promise.resolve();
	}
	static ɵfac = function ClerkService_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkService)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: ClerkService,
		factory: ClerkService.ɵfac,
		providedIn: "root"
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkService, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
/** Injection token for Clerk initialization options. Used internally by {@link provideClerk}. */
var CLERK_OPTIONS = new InjectionToken("CLERK_OPTIONS");
var NGX_CLERK_SDK_METADATA = {
	name: "ngx-clerk",
	version: "1.0.0",
	environment: "browser"
};
/**
* Provides Clerk authentication services to an Angular application.
* Add this to your application's providers array in `app.config.ts`.
*
* @example
* ```ts
* export const appConfig: ApplicationConfig = {
*   providers: [
*     provideClerk({ publishableKey: 'pk_test_...' }),
*   ],
* };
* ```
*/
function provideClerk(options) {
	return makeEnvironmentProviders([{
		provide: CLERK_OPTIONS,
		useValue: options
	}, provideAppInitializer(() => inject(ClerkService).initialize({
		...options,
		sdkMetadata: options.sdkMetadata ?? NGX_CLERK_SDK_METADATA
	}))]);
}
function checkAuth(clerk, state) {
	if (!clerk.isSignedIn()) {
		clerk.redirectToSignIn({ signInFallbackRedirectUrl: state.url });
		return false;
	}
	return true;
}
/**
* Route guard that restricts access to authenticated users.
* Redirects unauthenticated users to the Clerk sign-in page.
*
* @example
* ```ts
* const routes: Routes = [
*   { path: 'dashboard', component: DashboardComponent, canActivate: [canActivateClerk] },
* ];
* ```
*/
var canActivateClerk = (_route, state) => {
	const clerk = inject(ClerkService);
	if (clerk.isLoaded()) return checkAuth(clerk, state);
	return toObservable(clerk.isLoaded).pipe(filter((loaded) => loaded), take(1), map(() => checkAuth(clerk, state)));
};
/**
* Creates a route guard that restricts access to users satisfying an
* authorization condition (role, permission, feature, or plan). Unauthenticated
* users are redirected to sign-in; signed-in-but-unauthorized users are blocked
* (or redirected to `unauthorizedUrl`).
*
* @example
* ```ts
* const routes: Routes = [
*   {
*     path: 'admin',
*     component: AdminComponent,
*     canActivate: [canActivateProtect({ role: 'org:admin' }, { unauthorizedUrl: '/dashboard' })],
*   },
* ];
* ```
*/
function canActivateProtect(params, options = {}) {
	return (_route, state) => {
		const clerk = inject(ClerkService);
		const router = inject(Router);
		const check = () => {
			if (!clerk.isSignedIn()) {
				clerk.redirectToSignIn({ signInFallbackRedirectUrl: state.url });
				return false;
			}
			if (clerk.has(params)) return true;
			return options.unauthorizedUrl ? router.parseUrl(options.unauthorizedUrl) : false;
		};
		if (clerk.isLoaded()) return check();
		return toObservable(clerk.isLoaded).pipe(filter((loaded) => loaded), take(1), map(() => check()));
	};
}
/**
* Wires a ClerkJS mount component into Angular's reactive lifecycle.
*
* Mounts once the Clerk instance and host element are both available, re-mounts
* whenever the props change (so updates after the initial mount take effect),
* and unmounts on destroy. Inline object literals that are structurally equal
* do not trigger a re-mount. Must be called from an injection context (e.g. a
* component constructor).
*/
function mountClerkComponent(config) {
	const clerkService = inject(ClerkService);
	const destroyRef = inject(DestroyRef);
	let mountedNode = null;
	let lastProps;
	let hasMounted = false;
	effect(() => {
		const clerk = clerkService.clerk();
		const node = config.node();
		const props = config.props();
		if (!clerk || !node) return;
		if (hasMounted && mountedNode === node && clerkPropsEqual(props, lastProps)) return;
		if (mountedNode) config.unmount(clerk, mountedNode);
		config.mount(clerk, node, props);
		mountedNode = node;
		lastProps = props;
		hasMounted = true;
	});
	destroyRef.onDestroy(() => {
		const clerk = clerkService.clerk();
		if (clerk && mountedNode) {
			config.unmount(clerk, mountedNode);
			mountedNode = null;
		}
	});
}
/**
* Structural equality check for Clerk component props. Treats functions as
* equal-by-token so inline object literals in templates do not trigger needless
* re-mounts.
*/
function clerkPropsEqual(a, b) {
	if (Object.is(a, b)) return true;
	return stableStringify(a) === stableStringify(b);
}
function stableStringify(value) {
	try {
		return JSON.stringify(value, (_key, val) => {
			if (typeof val === "function") return "__fn__";
			if (val && typeof val === "object" && !Array.isArray(val)) return Object.fromEntries(Object.entries(val).sort(([a], [b]) => a.localeCompare(b)));
			return val;
		}) ?? "undefined";
	} catch {
		return "__unserializable__";
	}
}
/** Renders the Clerk Sign In UI component. */
var ClerkSignInComponent = class ClerkSignInComponent {
	/** Props forwarded to the Clerk Sign In component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountSignIn(node, props),
			unmount: (clerk, node) => clerk.unmountSignIn(node)
		});
	}
	static ɵfac = function ClerkSignInComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkSignInComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkSignInComponent,
			selectors: [["clerk-sign-in"]],
			viewQuery: function ClerkSignInComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkSignInComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkSignInComponent, [{
		type: Component,
		args: [{
			selector: "clerk-sign-in",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk Sign Up UI component. */
var ClerkSignUpComponent = class ClerkSignUpComponent {
	/** Props forwarded to the Clerk Sign Up component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountSignUp(node, props),
			unmount: (clerk, node) => clerk.unmountSignUp(node)
		});
	}
	static ɵfac = function ClerkSignUpComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkSignUpComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkSignUpComponent,
			selectors: [["clerk-sign-up"]],
			viewQuery: function ClerkSignUpComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkSignUpComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkSignUpComponent, [{
		type: Component,
		args: [{
			selector: "clerk-sign-up",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk User Profile UI component. */
var ClerkUserProfileComponent = class ClerkUserProfileComponent {
	/** Props forwarded to the Clerk User Profile component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountUserProfile(node, props),
			unmount: (clerk, node) => clerk.unmountUserProfile(node)
		});
	}
	static ɵfac = function ClerkUserProfileComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkUserProfileComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkUserProfileComponent,
			selectors: [["clerk-user-profile"]],
			viewQuery: function ClerkUserProfileComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkUserProfileComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkUserProfileComponent, [{
		type: Component,
		args: [{
			selector: "clerk-user-profile",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk User Button UI component. */
var ClerkUserButtonComponent = class ClerkUserButtonComponent {
	/** Props forwarded to the Clerk User Button component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountUserButton(node, props),
			unmount: (clerk, node) => clerk.unmountUserButton(node)
		});
	}
	static ɵfac = function ClerkUserButtonComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkUserButtonComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkUserButtonComponent,
			selectors: [["clerk-user-button"]],
			viewQuery: function ClerkUserButtonComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkUserButtonComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkUserButtonComponent, [{
		type: Component,
		args: [{
			selector: "clerk-user-button",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk User Avatar UI component. */
var ClerkUserAvatarComponent = class ClerkUserAvatarComponent {
	/** Props forwarded to the Clerk User Avatar component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountUserAvatar(node, props),
			unmount: (clerk, node) => clerk.unmountUserAvatar(node)
		});
	}
	static ɵfac = function ClerkUserAvatarComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkUserAvatarComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkUserAvatarComponent,
			selectors: [["clerk-user-avatar"]],
			viewQuery: function ClerkUserAvatarComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkUserAvatarComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkUserAvatarComponent, [{
		type: Component,
		args: [{
			selector: "clerk-user-avatar",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk Organization Profile UI component. */
var ClerkOrganizationProfileComponent = class ClerkOrganizationProfileComponent {
	/** Props forwarded to the Clerk Organization Profile component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountOrganizationProfile(node, props),
			unmount: (clerk, node) => clerk.unmountOrganizationProfile(node)
		});
	}
	static ɵfac = function ClerkOrganizationProfileComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkOrganizationProfileComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkOrganizationProfileComponent,
			selectors: [["clerk-organization-profile"]],
			viewQuery: function ClerkOrganizationProfileComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkOrganizationProfileComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkOrganizationProfileComponent, [{
		type: Component,
		args: [{
			selector: "clerk-organization-profile",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk Organization Switcher UI component. */
var ClerkOrganizationSwitcherComponent = class ClerkOrganizationSwitcherComponent {
	/** Props forwarded to the Clerk Organization Switcher component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountOrganizationSwitcher(node, props),
			unmount: (clerk, node) => clerk.unmountOrganizationSwitcher(node)
		});
	}
	static ɵfac = function ClerkOrganizationSwitcherComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkOrganizationSwitcherComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkOrganizationSwitcherComponent,
			selectors: [["clerk-organization-switcher"]],
			viewQuery: function ClerkOrganizationSwitcherComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkOrganizationSwitcherComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkOrganizationSwitcherComponent, [{
		type: Component,
		args: [{
			selector: "clerk-organization-switcher",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk Create Organization UI component. */
var ClerkCreateOrganizationComponent = class ClerkCreateOrganizationComponent {
	/** Props forwarded to the Clerk Create Organization component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountCreateOrganization(node, props),
			unmount: (clerk, node) => clerk.unmountCreateOrganization(node)
		});
	}
	static ɵfac = function ClerkCreateOrganizationComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkCreateOrganizationComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkCreateOrganizationComponent,
			selectors: [["clerk-create-organization"]],
			viewQuery: function ClerkCreateOrganizationComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkCreateOrganizationComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkCreateOrganizationComponent, [{
		type: Component,
		args: [{
			selector: "clerk-create-organization",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk Organization List UI component. */
var ClerkOrganizationListComponent = class ClerkOrganizationListComponent {
	/** Props forwarded to the Clerk Organization List component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountOrganizationList(node, props),
			unmount: (clerk, node) => clerk.unmountOrganizationList(node)
		});
	}
	static ɵfac = function ClerkOrganizationListComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkOrganizationListComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkOrganizationListComponent,
			selectors: [["clerk-organization-list"]],
			viewQuery: function ClerkOrganizationListComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkOrganizationListComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkOrganizationListComponent, [{
		type: Component,
		args: [{
			selector: "clerk-organization-list",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk Waitlist UI component. */
var ClerkWaitlistComponent = class ClerkWaitlistComponent {
	/** Props forwarded to the Clerk Waitlist component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountWaitlist(node, props),
			unmount: (clerk, node) => clerk.unmountWaitlist(node)
		});
	}
	static ɵfac = function ClerkWaitlistComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkWaitlistComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkWaitlistComponent,
			selectors: [["clerk-waitlist"]],
			viewQuery: function ClerkWaitlistComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkWaitlistComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkWaitlistComponent, [{
		type: Component,
		args: [{
			selector: "clerk-waitlist",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/** Renders the Clerk Pricing Table UI component. */
var ClerkPricingTableComponent = class ClerkPricingTableComponent {
	/** Props forwarded to the Clerk Pricing Table component. Updates re-mount the component. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_ref = viewChild("ref", ...ngDevMode ? [{ debugName: "_ref" }] : []);
	constructor() {
		mountClerkComponent({
			node: () => this._ref()?.nativeElement,
			props: () => this.props(),
			mount: (clerk, node, props) => clerk.mountPricingTable(node, props),
			unmount: (clerk, node) => clerk.unmountPricingTable(node)
		});
	}
	static ɵfac = function ClerkPricingTableComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkPricingTableComponent)();
	};
	static ɵcmp = (function() {
		const _c0 = ["ref"];
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: ClerkPricingTableComponent,
			selectors: [["clerk-pricing-table"]],
			viewQuery: function ClerkPricingTableComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx._ref, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: { props: [1, "props"] },
			decls: 2,
			vars: 0,
			consts: [["ref", ""]],
			template: function ClerkPricingTableComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkPricingTableComponent, [{
		type: Component,
		args: [{
			selector: "clerk-pricing-table",
			standalone: true,
			template: `<div #ref></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		props: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "props",
				required: false
			}]
		}],
		_ref: [{
			type: ViewChild,
			args: ["ref", { isSignal: true }]
		}]
	});
})();
/**
* Renders Google One Tap sign-in. Opens once Clerk has loaded and closes on
* destroy. Prop changes after the initial open are not re-applied.
*
* @example
* ```html
* <clerk-google-one-tap />
* ```
*/
var ClerkGoogleOneTapComponent = class ClerkGoogleOneTapComponent {
	/** Props forwarded to Google One Tap. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_clerk = inject(ClerkService);
	_opened = false;
	constructor() {
		const destroyRef = inject(DestroyRef);
		effect(() => {
			const clerk = this._clerk.clerk();
			if (clerk && !this._opened) {
				this._opened = true;
				clerk.openGoogleOneTap({
					cancelOnTapOutside: true,
					itpSupport: true,
					fedCmSupport: true,
					...this.props()
				});
			}
		});
		destroyRef.onDestroy(() => {
			if (this._opened) this._clerk.clerk()?.closeGoogleOneTap();
		});
	}
	static ɵfac = function ClerkGoogleOneTapComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkGoogleOneTapComponent)();
	};
	static ɵcmp = /*@__PURE__*/ ɵɵdefineComponent({
		type: ClerkGoogleOneTapComponent,
		selectors: [["clerk-google-one-tap"]],
		inputs: { props: [1, "props"] },
		decls: 0,
		vars: 0,
		template: function ClerkGoogleOneTapComponent_Template(rf, ctx) {},
		encapsulation: 2
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkGoogleOneTapComponent, [{
		type: Component,
		args: [{
			selector: "clerk-google-one-tap",
			standalone: true,
			template: ``,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], { props: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "props",
			required: false
		}]
	}] });
})();
/**
* Completes an OAuth/SSO redirect flow. Place it on your callback route (e.g.
* `/sso-callback`); it calls `handleRedirectCallback()` once Clerk has loaded.
*
* @example
* ```html
* <clerk-authenticate-with-redirect-callback
*   [props]="{ signInForceRedirectUrl: '/dashboard' }" />
* ```
*/
var ClerkAuthenticateWithRedirectCallbackComponent = class ClerkAuthenticateWithRedirectCallbackComponent {
	/** Parameters forwarded to `handleRedirectCallback`. */
	props = input(void 0, ...ngDevMode ? [{ debugName: "props" }] : []);
	_clerk = inject(ClerkService);
	_handled = false;
	constructor() {
		effect(() => {
			if (this._clerk.clerk() && !this._handled) {
				this._handled = true;
				this._clerk.handleRedirectCallback(this.props());
			}
		});
	}
	static ɵfac = function ClerkAuthenticateWithRedirectCallbackComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkAuthenticateWithRedirectCallbackComponent)();
	};
	static ɵcmp = /*@__PURE__*/ ɵɵdefineComponent({
		type: ClerkAuthenticateWithRedirectCallbackComponent,
		selectors: [["clerk-authenticate-with-redirect-callback"]],
		inputs: { props: [1, "props"] },
		decls: 0,
		vars: 0,
		template: function ClerkAuthenticateWithRedirectCallbackComponent_Template(rf, ctx) {},
		encapsulation: 2
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkAuthenticateWithRedirectCallbackComponent, [{
		type: Component,
		args: [{
			selector: "clerk-authenticate-with-redirect-callback",
			standalone: true,
			template: ``,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], { props: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "props",
			required: false
		}]
	}] });
})();
/**
* Base class for Clerk conditional structural directives. Renders the template
* when {@link shouldRender} is `true`, clears it otherwise, reactively.
*/
var ClerkConditionalDirective = class ClerkConditionalDirective {
	clerk = inject(ClerkService);
	_templateRef = inject(TemplateRef);
	_viewContainer = inject(ViewContainerRef);
	_viewRef = null;
	constructor() {
		effect(() => {
			const render = this.shouldRender();
			if (render && !this._viewRef) this._viewRef = this._viewContainer.createEmbeddedView(this._templateRef);
			else if (!render && this._viewRef) {
				this._viewContainer.clear();
				this._viewRef = null;
			}
		});
	}
	static ɵfac = function ClerkConditionalDirective_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkConditionalDirective)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({ type: ClerkConditionalDirective });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkConditionalDirective, [{ type: Directive }], () => [], null);
})();
/**
* Structural directive that renders its content only when a user is signed in.
*
* @example
* ```html
* <p *clerkSignedIn>Welcome back!</p>
* ```
*/
var ClerkSignedInDirective = class ClerkSignedInDirective extends ClerkConditionalDirective {
	shouldRender() {
		return this.clerk.isSignedIn();
	}
	static ɵfac = /*@__PURE__*/ (() => {
		let ɵClerkSignedInDirective_BaseFactory = void 0;
		return function ClerkSignedInDirective_Factory(__ngFactoryType__) {
			return (ɵClerkSignedInDirective_BaseFactory || (ɵClerkSignedInDirective_BaseFactory = ɵɵgetInheritedFactory(ClerkSignedInDirective)))(__ngFactoryType__ || ClerkSignedInDirective);
		};
	})();
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: ClerkSignedInDirective,
		selectors: [[
			"",
			"clerkSignedIn",
			""
		]],
		features: [ɵɵInheritDefinitionFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkSignedInDirective, [{
		type: Directive,
		args: [{
			selector: "[clerkSignedIn]",
			standalone: true
		}]
	}], null, null);
})();
/**
* Structural directive that renders its content only when Clerk has loaded and
* no user is signed in.
*
* @example
* ```html
* <button *clerkSignedOut clerkSignInButton>Sign in</button>
* ```
*/
var ClerkSignedOutDirective = class ClerkSignedOutDirective extends ClerkConditionalDirective {
	shouldRender() {
		return this.clerk.isLoaded() && !this.clerk.isSignedIn();
	}
	static ɵfac = /*@__PURE__*/ (() => {
		let ɵClerkSignedOutDirective_BaseFactory = void 0;
		return function ClerkSignedOutDirective_Factory(__ngFactoryType__) {
			return (ɵClerkSignedOutDirective_BaseFactory || (ɵClerkSignedOutDirective_BaseFactory = ɵɵgetInheritedFactory(ClerkSignedOutDirective)))(__ngFactoryType__ || ClerkSignedOutDirective);
		};
	})();
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: ClerkSignedOutDirective,
		selectors: [[
			"",
			"clerkSignedOut",
			""
		]],
		features: [ɵɵInheritDefinitionFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkSignedOutDirective, [{
		type: Directive,
		args: [{
			selector: "[clerkSignedOut]",
			standalone: true
		}]
	}], null, null);
})();
/**
* Structural directive that renders its content only after Clerk has finished
* loading.
*
* @example
* ```html
* <div *clerkLoaded><clerk-user-button /></div>
* ```
*/
var ClerkLoadedDirective = class ClerkLoadedDirective extends ClerkConditionalDirective {
	shouldRender() {
		return this.clerk.isLoaded();
	}
	static ɵfac = /*@__PURE__*/ (() => {
		let ɵClerkLoadedDirective_BaseFactory = void 0;
		return function ClerkLoadedDirective_Factory(__ngFactoryType__) {
			return (ɵClerkLoadedDirective_BaseFactory || (ɵClerkLoadedDirective_BaseFactory = ɵɵgetInheritedFactory(ClerkLoadedDirective)))(__ngFactoryType__ || ClerkLoadedDirective);
		};
	})();
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: ClerkLoadedDirective,
		selectors: [[
			"",
			"clerkLoaded",
			""
		]],
		features: [ɵɵInheritDefinitionFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkLoadedDirective, [{
		type: Directive,
		args: [{
			selector: "[clerkLoaded]",
			standalone: true
		}]
	}], null, null);
})();
/**
* Structural directive that renders its content only while Clerk is still
* loading.
*
* @example
* ```html
* <span *clerkLoading>Loading…</span>
* ```
*/
var ClerkLoadingDirective = class ClerkLoadingDirective extends ClerkConditionalDirective {
	shouldRender() {
		return !this.clerk.isLoaded();
	}
	static ɵfac = /*@__PURE__*/ (() => {
		let ɵClerkLoadingDirective_BaseFactory = void 0;
		return function ClerkLoadingDirective_Factory(__ngFactoryType__) {
			return (ɵClerkLoadingDirective_BaseFactory || (ɵClerkLoadingDirective_BaseFactory = ɵɵgetInheritedFactory(ClerkLoadingDirective)))(__ngFactoryType__ || ClerkLoadingDirective);
		};
	})();
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: ClerkLoadingDirective,
		selectors: [[
			"",
			"clerkLoading",
			""
		]],
		features: [ɵɵInheritDefinitionFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkLoadingDirective, [{
		type: Directive,
		args: [{
			selector: "[clerkLoading]",
			standalone: true
		}]
	}], null, null);
})();
/**
* Structural directive that renders its content only when the current user is
* authorized. Pass a role/permission/feature/plan object or a predicate. An
* optional `else` template is rendered when unauthorized.
*
* @example
* ```html
* <section *clerkProtect="{ role: 'org:admin' }">Admin only</section>
*
* <section *clerkProtect="{ permission: 'org:posts:manage' }; else noAccess">
*   Manage posts
* </section>
* <ng-template #noAccess>You do not have access.</ng-template>
* ```
*/
var ClerkProtectDirective = class ClerkProtectDirective {
	_clerk = inject(ClerkService);
	_templateRef = inject(TemplateRef);
	_viewContainer = inject(ViewContainerRef);
	_viewRef = null;
	_shownTemplate = null;
	/** Authorization condition: a role/permission/feature/plan object, or a predicate. */
	clerkProtect = input(void 0, ...ngDevMode ? [{ debugName: "clerkProtect" }] : []);
	/** Template rendered when the user is unauthorized. */
	clerkProtectElse = input(null, ...ngDevMode ? [{ debugName: "clerkProtectElse" }] : []);
	constructor() {
		effect(() => {
			if (!this._clerk.isLoaded()) {
				this._render(null);
				return;
			}
			this._render(this._authorized() ? this._templateRef : this.clerkProtectElse());
		});
	}
	_authorized() {
		if (!this._clerk.isSignedIn()) return false;
		const condition = this.clerkProtect();
		if (!condition) return true;
		if (typeof condition === "function") {
			const has = ((params) => this._clerk.has(params));
			return condition(has);
		}
		return this._clerk.has(condition);
	}
	_render(template) {
		if (this._shownTemplate === template) return;
		this._viewContainer.clear();
		this._viewRef = template ? this._viewContainer.createEmbeddedView(template) : null;
		this._shownTemplate = template;
	}
	static ɵfac = function ClerkProtectDirective_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkProtectDirective)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: ClerkProtectDirective,
		selectors: [[
			"",
			"clerkProtect",
			""
		]],
		inputs: {
			clerkProtect: [1, "clerkProtect"],
			clerkProtectElse: [1, "clerkProtectElse"]
		}
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkProtectDirective, [{
		type: Directive,
		args: [{
			selector: "[clerkProtect]",
			standalone: true
		}]
	}], () => [], {
		clerkProtect: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "clerkProtect",
				required: false
			}]
		}],
		clerkProtectElse: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "clerkProtectElse",
				required: false
			}]
		}]
	});
})();
/**
* Attribute directive that triggers Clerk sign-in on click. In `redirect` mode
* (default) it navigates to the sign-in page; in `modal` mode it opens the
* sign-in modal. Apply it to your own button so you keep full control of styling.
*
* @example
* ```html
* <button clerkSignInButton>Sign in</button>
* <button clerkSignInButton mode="modal">Sign in</button>
* ```
*/
var ClerkSignInButtonDirective = class ClerkSignInButtonDirective {
	_clerk = inject(ClerkService);
	/** `'redirect'` (default) navigates to the sign-in page; `'modal'` opens the modal. */
	mode = input("redirect", ...ngDevMode ? [{ debugName: "mode" }] : []);
	forceRedirectUrl = input(...ngDevMode ? [void 0, { debugName: "forceRedirectUrl" }] : []);
	fallbackRedirectUrl = input(...ngDevMode ? [void 0, { debugName: "fallbackRedirectUrl" }] : []);
	signUpForceRedirectUrl = input(...ngDevMode ? [void 0, { debugName: "signUpForceRedirectUrl" }] : []);
	signUpFallbackRedirectUrl = input(...ngDevMode ? [void 0, { debugName: "signUpFallbackRedirectUrl" }] : []);
	onClick() {
		if (this.mode() === "modal") {
			this._clerk.openSignIn({
				forceRedirectUrl: this.forceRedirectUrl(),
				fallbackRedirectUrl: this.fallbackRedirectUrl(),
				signUpForceRedirectUrl: this.signUpForceRedirectUrl(),
				signUpFallbackRedirectUrl: this.signUpFallbackRedirectUrl()
			});
			return;
		}
		this._clerk.redirectToSignIn({
			signInForceRedirectUrl: this.forceRedirectUrl(),
			signInFallbackRedirectUrl: this.fallbackRedirectUrl(),
			signUpForceRedirectUrl: this.signUpForceRedirectUrl(),
			signUpFallbackRedirectUrl: this.signUpFallbackRedirectUrl()
		});
	}
	static ɵfac = function ClerkSignInButtonDirective_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkSignInButtonDirective)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: ClerkSignInButtonDirective,
		selectors: [[
			"",
			"clerkSignInButton",
			""
		]],
		hostBindings: function ClerkSignInButtonDirective_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("click", function ClerkSignInButtonDirective_click_HostBindingHandler() {
				return ctx.onClick();
			});
		},
		inputs: {
			mode: [1, "mode"],
			forceRedirectUrl: [1, "forceRedirectUrl"],
			fallbackRedirectUrl: [1, "fallbackRedirectUrl"],
			signUpForceRedirectUrl: [1, "signUpForceRedirectUrl"],
			signUpFallbackRedirectUrl: [1, "signUpFallbackRedirectUrl"]
		}
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkSignInButtonDirective, [{
		type: Directive,
		args: [{
			selector: "[clerkSignInButton]",
			standalone: true,
			host: { "(click)": "onClick()" }
		}]
	}], null, {
		mode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "mode",
				required: false
			}]
		}],
		forceRedirectUrl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "forceRedirectUrl",
				required: false
			}]
		}],
		fallbackRedirectUrl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "fallbackRedirectUrl",
				required: false
			}]
		}],
		signUpForceRedirectUrl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "signUpForceRedirectUrl",
				required: false
			}]
		}],
		signUpFallbackRedirectUrl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "signUpFallbackRedirectUrl",
				required: false
			}]
		}]
	});
})();
/**
* Attribute directive that triggers Clerk sign-up on click. In `redirect` mode
* (default) it navigates to the sign-up page; in `modal` mode it opens the
* sign-up modal.
*
* @example
* ```html
* <button clerkSignUpButton>Create account</button>
* ```
*/
var ClerkSignUpButtonDirective = class ClerkSignUpButtonDirective {
	_clerk = inject(ClerkService);
	/** `'redirect'` (default) navigates to the sign-up page; `'modal'` opens the modal. */
	mode = input("redirect", ...ngDevMode ? [{ debugName: "mode" }] : []);
	forceRedirectUrl = input(...ngDevMode ? [void 0, { debugName: "forceRedirectUrl" }] : []);
	fallbackRedirectUrl = input(...ngDevMode ? [void 0, { debugName: "fallbackRedirectUrl" }] : []);
	signInForceRedirectUrl = input(...ngDevMode ? [void 0, { debugName: "signInForceRedirectUrl" }] : []);
	signInFallbackRedirectUrl = input(...ngDevMode ? [void 0, { debugName: "signInFallbackRedirectUrl" }] : []);
	onClick() {
		if (this.mode() === "modal") {
			this._clerk.openSignUp({
				forceRedirectUrl: this.forceRedirectUrl(),
				fallbackRedirectUrl: this.fallbackRedirectUrl(),
				signInForceRedirectUrl: this.signInForceRedirectUrl(),
				signInFallbackRedirectUrl: this.signInFallbackRedirectUrl()
			});
			return;
		}
		this._clerk.redirectToSignUp({
			signUpForceRedirectUrl: this.forceRedirectUrl(),
			signUpFallbackRedirectUrl: this.fallbackRedirectUrl(),
			signInForceRedirectUrl: this.signInForceRedirectUrl(),
			signInFallbackRedirectUrl: this.signInFallbackRedirectUrl()
		});
	}
	static ɵfac = function ClerkSignUpButtonDirective_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkSignUpButtonDirective)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: ClerkSignUpButtonDirective,
		selectors: [[
			"",
			"clerkSignUpButton",
			""
		]],
		hostBindings: function ClerkSignUpButtonDirective_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("click", function ClerkSignUpButtonDirective_click_HostBindingHandler() {
				return ctx.onClick();
			});
		},
		inputs: {
			mode: [1, "mode"],
			forceRedirectUrl: [1, "forceRedirectUrl"],
			fallbackRedirectUrl: [1, "fallbackRedirectUrl"],
			signInForceRedirectUrl: [1, "signInForceRedirectUrl"],
			signInFallbackRedirectUrl: [1, "signInFallbackRedirectUrl"]
		}
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkSignUpButtonDirective, [{
		type: Directive,
		args: [{
			selector: "[clerkSignUpButton]",
			standalone: true,
			host: { "(click)": "onClick()" }
		}]
	}], null, {
		mode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "mode",
				required: false
			}]
		}],
		forceRedirectUrl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "forceRedirectUrl",
				required: false
			}]
		}],
		fallbackRedirectUrl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "fallbackRedirectUrl",
				required: false
			}]
		}],
		signInForceRedirectUrl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "signInForceRedirectUrl",
				required: false
			}]
		}],
		signInFallbackRedirectUrl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "signInFallbackRedirectUrl",
				required: false
			}]
		}]
	});
})();
/**
* Attribute directive that signs the current user out on click.
*
* @example
* ```html
* <button clerkSignOutButton redirectUrl="/">Sign out</button>
* ```
*/
var ClerkSignOutButtonDirective = class ClerkSignOutButtonDirective {
	_clerk = inject(ClerkService);
	/** URL to navigate to after signing out. */
	redirectUrl = input(...ngDevMode ? [void 0, { debugName: "redirectUrl" }] : []);
	/** A specific session to sign out of. Omit to sign out of all sessions. */
	sessionId = input(...ngDevMode ? [void 0, { debugName: "sessionId" }] : []);
	onClick() {
		this._clerk.signOut({
			redirectUrl: this.redirectUrl(),
			sessionId: this.sessionId()
		});
	}
	static ɵfac = function ClerkSignOutButtonDirective_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ClerkSignOutButtonDirective)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: ClerkSignOutButtonDirective,
		selectors: [[
			"",
			"clerkSignOutButton",
			""
		]],
		hostBindings: function ClerkSignOutButtonDirective_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("click", function ClerkSignOutButtonDirective_click_HostBindingHandler() {
				return ctx.onClick();
			});
		},
		inputs: {
			redirectUrl: [1, "redirectUrl"],
			sessionId: [1, "sessionId"]
		}
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClerkSignOutButtonDirective, [{
		type: Directive,
		args: [{
			selector: "[clerkSignOutButton]",
			standalone: true,
			host: { "(click)": "onClick()" }
		}]
	}], null, {
		redirectUrl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "redirectUrl",
				required: false
			}]
		}],
		sessionId: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "sessionId",
				required: false
			}]
		}]
	});
})();
/**
* Creates a URL matcher for catch-all routes used by Clerk components.
* Matches any URL that starts with the given path segment.
*
* @example
* ```ts
* const routes: Routes = [
*   { matcher: catchAllRoute('sign-in'), component: SignInPageComponent },
* ];
* ```
*/
var catchAllRoute = (catchAllPath) => (url) => url?.[0]?.path.startsWith(catchAllPath) ? { consumed: url } : null;
//#endregion
export { CLERK_OPTIONS, ClerkAPIResponseError, ClerkAuthenticateWithRedirectCallbackComponent, ClerkCreateOrganizationComponent, ClerkGoogleOneTapComponent, ClerkLoadedDirective, ClerkLoadingDirective, ClerkOfflineError, ClerkOrganizationListComponent, ClerkOrganizationProfileComponent, ClerkOrganizationSwitcherComponent, ClerkPricingTableComponent, ClerkProtectDirective, ClerkRuntimeError, ClerkService, ClerkSignInButtonDirective, ClerkSignInComponent, ClerkSignOutButtonDirective, ClerkSignUpButtonDirective, ClerkSignUpComponent, ClerkSignedInDirective, ClerkSignedOutDirective, ClerkUserAvatarComponent, ClerkUserButtonComponent, ClerkUserProfileComponent, ClerkWaitlistComponent, EmailLinkErrorCodeStatus, canActivateClerk, canActivateProtect, catchAllRoute, isClerkAPIResponseError, isClerkRuntimeError, isEmailLinkError, isKnownError, isMetamaskError, provideClerk };
