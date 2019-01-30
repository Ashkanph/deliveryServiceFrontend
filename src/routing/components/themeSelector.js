import React, {Component} from "react";
import {connect} from "react-redux";
import {getPropertyValue} from "../../functions/common";
import {lighten, darken} from "../../functions/colors";
import {changeTheme} from "../../store/actions/view";


class ThemeSelector extends Component {
  
  constructor(props) {
    super(props);
    
    this.changeTheme = this.changeTheme.bind(this);
  }
  
  changeTheme(e){
    let theme = e.target.value,
        primaryBg = defaultColors[theme].primaryBg,
        accent = defaultColors[theme].accent,
        foreground = defaultColors[theme].foreground;
        
    document.body.style.setProperty("--primary-background", primaryBg);
    
    if(defaultColors[theme].type === "dark"){
      document.body.style.setProperty("--primary-background-lighter-15", lighten(primaryBg, 15));
      document.body.style.setProperty("--primary-background-lighter-3", lighten(primaryBg, 3));
      document.body.style.setProperty("--primary-background-lighter-5", lighten(primaryBg, 5));
      document.body.style.setProperty("--primary-background-lighter-15-10", lighten(primaryBg, 1.5));
      document.body.style.setProperty("--foreground-darker-55", darken(foreground, 50));
      document.body.style.setProperty("--foreground-darker-30",  darken(foreground, 30));
      document.body.style.setProperty("--foreground-darker-20",  darken(foreground, 20));
    }else{
      document.body.style.setProperty("--primary-background-lighter-15", darken(primaryBg, 15));
      document.body.style.setProperty("--primary-background-lighter-3", darken(primaryBg, 3));
      document.body.style.setProperty("--primary-background-lighter-5", darken(primaryBg, 5));
      document.body.style.setProperty("--primary-background-lighter-15-10", darken(primaryBg, 1.5));
      document.body.style.setProperty("--foreground-darker-55", lighten(foreground, 55));
      document.body.style.setProperty("--foreground-darker-30", lighten(foreground, 30));
      document.body.style.setProperty("--foreground-darker-20", lighten(foreground, 20));
    }
    
    document.body.style.setProperty("--primary-background-darker-5", darken(primaryBg, 5));
    document.body.style.setProperty("--primary-background-darker-10", darken(primaryBg, 10));
    document.body.style.setProperty("--primary-accent", accent);
    document.body.style.setProperty("--foreground", foreground);
    changeTheme(theme);
  }

  render() {
    let {language, langData, theme} = this.props,
        margin = (language === "fa") ? "0 0 0 0.5rem" : "0 0.5rem 0 0";
         
    return (
      <select name="industries_served"
              onChange={this.changeTheme}
              style={{ display:"inline-block", color: "var(--foreground)",
                       boxShadow: "0 0 0 1px #9e9e9e inset", 
                       background: "var(--primary-background)",
                       borderRadius: "3px",
                       padding: "0.15rem",
                       margin: margin}}>
        {
          Object.keys(defaultColors).map(
            option => <option value={option} selected={theme === option}>
                        {langData[option][language]}
                      </option>
          )
        }
      </select>
    );
  }
}

const defaultColors = {
  darkTheme: {
    primaryBg: "#212121",
    accent: "#03a9f4",
    foreground: "#E0E0E0",
    type: "dark"
  },
  lightTheme: {
    primaryBg: "#f4f5f1",
    accent: "#0288d1",
    foreground: "#363030",
    type: "light"
  },
  // purpleTheme: {
  //   primaryBg: "#311B92",
  //   accent: "#FFC107",
  //   foreground: "#EDE7F6",
  //   type: "dark"
  // },
  brownTheme: {
    primaryBg: "#3E2723",
    accent: "#E6EE9C",
    foreground: "#EFEBE9",
    type: "dark"
  },
  // orangeTheme: {
  //   primaryBg: "#F57C00",
  //   accent: "#FFCA28",
  //   foreground: "#212121",
  //   type: "dark"
  // },
  // blueTheme: {
  //   primaryBg: "#B3E5FC",
  //   accent: "#FFA726",
  //   foreground: "#363030",
  //   type: "light"
  // },
  greenTheme: {
    primaryBg: "#C8E6C9",
    accent: "#7B1FA2",
    foreground: "#363030",
    type: "light"
  },
};

function setProps(store) {
  return {
    language: store.lang.language,
    langData: getPropertyValue(store, "lang.data"),
    theme:   getPropertyValue(store, "view.theme"),
  };
}

export default connect(setProps)(ThemeSelector);
