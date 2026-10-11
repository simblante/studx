// schools.js
// Central Visayas universities and colleges.
// Update this list when new schools need to be added.
//
// Each entry:
//   name        — Full official name (shown in the dropdown)
//   shortNames  — Lowercase aliases for autocomplete (e.g. "ctu", "cebu tech")
//   region      — One of: Central Visayas
//   province    — Province name
//   emailSuffix — Email domain used by the school (e.g. "@ctu.edu.ph")
//   campuses    — Array of campus names

export const SCHOOLS = [
  // ---------- Cebu ----------
  {
    name: "Cebu Technological University",
    shortNames: ["ctu", "cebu tech", "cebu technological"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@ctu.edu.ph",
    campuses: [
      "Main Campus",
      "Argao Campus",
      "Barili Campus",
      "Carmen Campus",
      "Compostela Campus",
      "Consolacion Campus",
      "Daanbantayan Campus",
      "Danao Campus",
      "Ginatilan Campus",
      "Malabuyoc Campus",
      "Medellin Campus",
      "Moalboal Campus",
      "Naga Campus",
      "Oslob Campus",
      "Pinamungajan Campus",
      "San Fernando Campus",
      "San Francisco Campus",
      "San Remigio Campus",
      "Tabuelan Campus",
      "Tuburan Campus"
    ]
  },
  {
    name: "University of San Carlos",
    shortNames: ["usc", "san carlos"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@usc.edu.ph",
    campuses: ["Downtown Campus", "Talamban Campus", "North Campus"]
  },
  {
    name: "University of the Philippines Cebu",
    shortNames: ["up", "up cebu", "upcebu"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@up.edu.ph",
    campuses: ["Lahug Campus"]
  },
  {
    name: "Cebu Institute of Technology - University",
    shortNames: ["cit", "cit-u", "cebu institute"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@cit.edu",
    campuses: ["Main Campus"]
  },
  {
    name: "University of Cebu",
    shortNames: ["uc", "cebu"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@uc.edu.ph",
    campuses: [
      "Main Campus",
      "Banilad Campus",
      "Lapu-Lapu and Mandaue Campus",
      "Pardo and Talisay Campus",
      "Mambaling Campus",
      "Private Campus"
    ]
  },
  {
    name: "University of San Jose-Recoletos",
    shortNames: ["usjr", "san jose"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@usjr.edu.ph",
    campuses: ["Main Campus", "Basak Campus", "Balamban Campus"]
  },
  {
    name: "Cebu Normal University",
    shortNames: ["cnu", "cebu normal"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@cnu.edu.ph",
    campuses: ["Main Campus", "Balamban Campus", "Medellin Campus"]
  },
  {
    name: "Southwestern University PHINMA",
    shortNames: ["swu", "phinma"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@swu.edu.ph",
    campuses: ["Main Campus", "Aznar Campus"]
  },
  {
    name: "Velez College",
    shortNames: ["velez"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@velezcollege.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Cebu Doctors' University",
    shortNames: ["cdu", "cebu doctors"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@cdu.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "University of Southern Philippines Foundation",
    shortNames: ["uspf", "southern philippines"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@uspf.edu.ph",
    campuses: ["Lahug Campus", "Mabini Campus"]
  },
  {
    name: "Cebu Institute of Medicine",
    shortNames: ["cim"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@cim.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Benedicto College",
    shortNames: ["benedicto"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@benedictocollege.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Asian College of Technology",
    shortNames: ["act", "asian college"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@act.edu.ph",
    campuses: ["Main Campus", "Bulacao Campus"]
  },
  {
    name: "STI College Cebu",
    shortNames: ["sti", "sti cebu"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@sti.edu.ph",
    campuses: ["Main Campus", "Ayala Campus"]
  },
  {
    name: "AMA University Cebu",
    shortNames: ["ama", "ama cebu"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@ama.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Mapúa University Cebu",
    shortNames: ["mapua", "mapua cebu"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@mapua.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "FEU Institute of Technology Cebu",
    shortNames: ["feu", "feu tech"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@feutech.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Mandaue City College",
    shortNames: ["mcc", "mandaue"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@mandauecitycollege.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Lapu-Lapu City College",
    shortNames: ["llcc", "lapu-lapu"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@llcc.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Talisay City College",
    shortNames: ["tcc", "talisay"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@tcc.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Cebu City College",
    shortNames: ["ccc", "cebu city"],
    region: "Central Visayas",
    province: "Cebu",
    emailSuffix: "@cebucitycollege.edu.ph",
    campuses: ["Main Campus"]
  },

  // ---------- Bohol ----------
  {
    name: "Bohol Island State University",
    shortNames: ["bisu", "bohol island"],
    region: "Central Visayas",
    province: "Bohol",
    emailSuffix: "@bisu.edu.ph",
    campuses: [
      "Main Campus",
      "Balilihan Campus",
      "Bilar Campus",
      "Candijay Campus",
      "Clarin Campus",
      "Calape Campus",
      "Tagbilaran Campus"
    ]
  },
  {
    name: "Holy Name University",
    shortNames: ["hnu", "holy name"],
    region: "Central Visayas",
    province: "Bohol",
    emailSuffix: "@hnu.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "University of Bohol",
    shortNames: ["ub", "bohol"],
    region: "Central Visayas",
    province: "Bohol",
    emailSuffix: "@universityofbohol.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Bohol Northern Star College",
    shortNames: ["bnsc", "northern star"],
    region: "Central Visayas",
    province: "Bohol",
    emailSuffix: "@bnsc.edu.ph",
    campuses: ["Main Campus"]
  },

  // ---------- Negros Oriental ----------
  {
    name: "Negros Oriental State University",
    shortNames: ["norsu", "negros oriental"],
    region: "Central Visayas",
    province: "Negros Oriental",
    emailSuffix: "@norsu.edu.ph",
    campuses: [
      "Main Campus",
      "Bayawan-Sta. Catalina Campus",
      "Bais Campus",
      "Guihulngan Campus",
      "Mabinay Campus",
      "Siaton Campus"
    ]
  },
  {
    name: "Silliman University",
    shortNames: ["su", "silliman"],
    region: "Central Visayas",
    province: "Negros Oriental",
    emailSuffix: "@su.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Foundation University",
    shortNames: ["fu", "foundation"],
    region: "Central Visayas",
    province: "Negros Oriental",
    emailSuffix: "@foundationu.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Central Philippine University",
    shortNames: ["cpu", "central philippine"],
    region: "Central Visayas",
    province: "Negros Oriental",
    emailSuffix: "@cpu.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "St. Paul University Dumaguete",
    shortNames: ["spud", "st paul"],
    region: "Central Visayas",
    province: "Negros Oriental",
    emailSuffix: "@spud.edu.ph",
    campuses: ["Main Campus"]
  },
  {
    name: "Colegio de la Purisima Concepcion",
    shortNames: ["cdpc", "purisima"],
    region: "Central Visayas",
    province: "Negros Oriental",
    emailSuffix: "@cdpc.edu.ph",
    campuses: ["Main Campus"]
  },

  // ---------- Siquijor ----------
  {
    name: "Siquijor State College",
    shortNames: ["ssc", "siquijor"],
    region: "Central Visayas",
    province: "Siquijor",
    emailSuffix: "@ssc.edu.ph",
    campuses: ["Main Campus", "Larena Campus", "Lazi Campus"]
  }
];