import {
    hasNativeDeclarativeShadowRoots,
    hydrateShadowRoots,
} from "@webcomponents/template-shadowroot";
if(!hasNativeDeclarativeShadowRoots) {
    hydrateShadowRoots(document.body);
}
