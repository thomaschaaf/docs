import {Component, h} from "@stencil/core";
import {
  containerInnerStyle,
  containerOuterStyle,
  logoStyle,
} from "./link-banner.style";
import * as links from "../../constants/links";

@Component({tag: "docs-link-banner", shadow: false})
export class DocsLinkBanner {
  render() {
    return (
      <amplify-container
        class={containerOuterStyle}
        innerClass={containerInnerStyle}
      >
        <amplify-external-link href={links.GITHUB} graphic="black">
          <img src="/assets/github.svg" class={logoStyle} />
          Amplify GitHub
        </amplify-external-link>
        <amplify-external-link href={links.DISCORD} graphic="black">
          <img src="/assets/discord-blue.svg" class={logoStyle} />
          Amplify on Discord
        </amplify-external-link>
        <amplify-external-link href={links.MARKETING} graphic="black">
          <img src="/assets/aws-dark.svg" class={logoStyle} />
          Amplify Resources
        </amplify-external-link>
        <amplify-external-link href={links.COMMUNITY} graphic="black">
          <img src="/assets/logo-dark.svg" class={logoStyle} />
          Amplify Community
        </amplify-external-link>
      </amplify-container>
    );
  }
}
