<!-- eslint-disable max-len -->
<template>
  <section id="about">
    <header>
      <h2>What is this?</h2>
    </header>
    <section>
      <p>
        This tool is a Custom String editor for the <a href="https://www.tradeskillmaster.com/">TradeSkillMaster</a> addon for the game World of Warcraft.
      </p>
      <p>
        Custom Strings are tools that let you customize the behavior of how the TSM addon operates. They are written in a formula language that uses functions, price sources, and value sources, kind of like a fancy Excel formula. You can read more about them at the <a target="_new" href="http://support.tradeskillmaster.com/display/KB/Custom+Strings">TSM Knowledgebase Article about Custom Strings</a>.
      </p>
      <p>
        This website is not maintained by the TradeSkillMaster team or product, so if you have support questions regarding the user of the tools on this site, please reach out by filing a <a href="https://github.com/mike-douglas/tsm-editor/issues/new/choose">GitHub Issue</a>. It is a tool created for the WOW goldmaking community by a fellow goldmaker.
      </p>
    </section>
    <header>
      <h2>Why does this tool exist?</h2>
    </header>
    <section>
      <p>This tool is an offline editor for Custom Strings, meaning that you don't need to use the in-game TradeSkillMaster tools for writing Custom Strings! It also has some other useful features:</p>
      <ul>
        <li><strong>Sharable Links:</strong> The custom string you're working on can be bookmarked for later or shared with others by copying the URL right in your browser</li>
        <li><strong>Enhanced Editor:</strong> The editor has features similar to an IDE you'd use to write code; it has auto-complete features and syntax highlighting that helps give you everything you need in one place to write custom strings</li>
        <li><strong>Reference:</strong> The site also has a searchable reference of all of the current TSM Price Sources, Value Sources, and Functions</li>
      </ul>
    </section>
    <header>
      <h2>Contributing</h2>
    </header>
    <section>
      <p>
        This application is open source software, so anyone can contribute to it! If you are a software engineer who is interested in adding a feature or making this tool better for the goblin community, please head to the <a href="https://github.com/mike-douglas/tsm-editor">GitHub page for this project</a>. I'd be totally psyched to work on this with some more people!
      </p>
      <p>
        If you're not a software engineer or just have some ideas on how to improve the tool, I'd love to hear from you too! Bugs and feature requests can be created by going to the GitHub Issues part of the project <a href="https://github.com/mike-douglas/tsm-editor/issues/new/choose">here</a>.
      </p>
    </section>
  </section>
</template>

<style lang="scss" scoped>
#about {
  max-width: 50em;
  padding: $padding-normal;
}

li {
  line-height: $line-height;
  margin-bottom: $padding-normal;
}
</style>
