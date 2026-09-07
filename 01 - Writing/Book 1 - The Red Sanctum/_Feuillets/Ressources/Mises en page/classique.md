---
version: 2
profile: manuscript
page:
  size: A4
  orientation: portrait
  marginsCm:
    top: 2.5
    bottom: 2.5
    left: 2.5
    right: 2.5
  mirrorMargins: false
  columns:
    count: 1
    gutterPt: 0
body:
  fontFamily: "'Times New Roman', Times, serif"
  fontSizePt: 12
  lineHeight: 2
  align: justify
  firstLineIndentPt: 18
  paragraphSpacingBeforePt: 0
  paragraphSpacingAfterPt: 0
  hyphenation: true
headings:
  h1:
    pageBreakBefore: true
  h2:
    pageBreakBefore: true
    fontSizePt: 14
    bold: true
    align: center
  h3:
    pageBreakBefore: false
    fontSizePt: 14
    bold: true
    italic: true
    marginBottomPt: 36
    align: center
  h4: {}
  h5: {}
  h6: {}
blockquote: {}
sceneDivider: "***"
header:
  enabled: true
  left: "{title}"
  center: ""
  right: "{author}"
  distanceCm: 0.75
  bodyGapPt: 3
  differentOddEven: false
footer:
  enabled: true
  left: ""
  center: ""
  right: Page {page} sur {pages}
  distanceCm: 0.75
  bodyGapPt: 3
firstPage:
  hideHeader: true
  pageNumberPosition: right
titlePage:
  styles:
    titre:
      fontSizePt: 18
      align: center
      marginTopPt: 126
      marginBottomPt: 24
    sous-titre:
      fontSizePt: 12
      align: center
      marginBottomPt: 120
    mots:
      fontSizePt: 12
      align: center
      marginBottomPt: 132
    auteur:
      fontSizePt: 12
      align: center
    adresse:
      fontSizePt: 12
      align: center
      marginBottomPt: 36
    coordonnées:
      fontSizePt: 12
      align: center
semanticRoleMarkers: legacy
label: Manuscrit éditeur
---
