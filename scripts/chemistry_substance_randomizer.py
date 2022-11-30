import random

CATIONS = ['potassium', 'sodium', 'calcium', 'magnesium', 'aluminium', 'zinc', 'iron(II)', 'iron(III)', 'lead(II)', 'copper(II)', 'silver', 'gold']
ANIONS = ['sulfate', 'nitrate', 'iodide', 'carbonate', 'oxide', 'hydroxide', 'fluoride', 'chloride', 'bromide', 'iodide']

def state():
   return random.choice([' (s)',' (aq)'])
MSALTS = []
for cation in CATIONS:
   for anion in ANIONS:
      s = state()
      MSALTS += [cation + ' ' + anion + s]

METALS = ['potassium', 'sodium', 'calcium', 'magnesium', 'aluminium', 'zinc', 'iron', 'lead', 'copper', 'silver', 'gold']

OTHERS = []
otherList = ['fluorine', 'chlorine', 'bromine', 'iodine', 'ammonia']
for other in otherList:
   OTHERS += [other + ' (g)']
   OTHERS += [other + ' (aq)']

COMMON = ['copper (II) carbonate', 'silver chloride', 'silver iodide', 'potassium manganate(VII)', 'manganese(IV)', 'iodine (s)', 'charcoal', 'dilute acid', 'dilute alkali', 'hydrogen peroxide']

substances = [MSALTS.copy()] + [METALS.copy()] + [OTHERS.copy()] + [COMMON.copy()]
substances.reverse()

# number of terms
N_MSALTS = len(MSALTS)
N_METALS = len(METALS)
N_OTHERS = len(OTHERS)
N_COMMON = len(COMMON)

N_SUBSTANCES=0
for listNo in range(0,len(substances)):
   N_SUBSTANCES += len(substances[listNo])
n_substances = N_SUBSTANCES

# biases
B_MSALTS = N_MSALTS / N_SUBSTANCES
B_METALS = N_METALS / N_SUBSTANCES
B_OTHERS = N_OTHERS / N_SUBSTANCES
B_COMMON = N_COMMON / N_SUBSTANCES

# relative weights - if all is 1, it will choose as equal probabilities for all in SUBSTANCES unless there is /
R_MSALTS = 1 * B_MSALTS / 8 #lowers probability because there are too many
R_METALS = 1 * B_METALS
R_OTHERS = 1 * B_OTHERS
R_COMMON = 1 * B_COMMON

R_TOTAL = R_MSALTS + R_METALS + R_OTHERS + R_COMMON

# probability of selecting each group
P_MSALTS = R_MSALTS / R_TOTAL
P_METALS = R_METALS / R_TOTAL
P_OTHERS = R_OTHERS / R_TOTAL
P_COMMON = R_COMMON / R_TOTAL
PROBABILITIES = [P_MSALTS, P_METALS, P_OTHERS, P_COMMON]

# cumulative probability
P_CUMULATIVE = []
for n in range(len(PROBABILITIES)):
   p_sum = PROBABILITIES[n]
   for p in range(len(PROBABILITIES)):
      if p < n:
         p_sum += PROBABILITIES[p]
   P_CUMULATIVE += [p_sum]

# multiply each value by 100
P_CUMULATIVE_new = []
for p in P_CUMULATIVE:
   P_CUMULATIVE_new += [p * 100]
P_CUMULATIVE = P_CUMULATIVE_new

P_CUMULATIVE.reverse()

# limited to 20 so that the nested list doesn't run out
# elements will not repeat until replenish
def getRandSubstance(button):
   global substances
   global n_substances
   if n_substances >= 20:
      randint = random.randint(0, 100)
      for n in range(len(P_CUMULATIVE)):
         if randint <= P_CUMULATIVE[n]:
            chosen_group = n
      try:
         #choose 1 random substance in 1 random group
         choice = random.choice(substances[chosen_group])
         #remove choice from the group
         substances[chosen_group].remove(choice)
         n_substances -= 1
         return Element('random-substance').write(str(choice)), n_substances
      except:
         Element('replenish-warning').write('⚠ low')
         return getRandSubstance(None)
   else:
      Element('random-substance').write('[Null]')
      Element('replenish-warning').write('⚠ plz replenish')
      return


def replenishSubstance(button):
   global substances
   global n_substances
   Element('replenish-warning').write('')
   substances = [MSALTS.copy()] + [METALS.copy()] + [OTHERS.copy()] + [COMMON.copy()]
   n_substances = N_SUBSTANCES
   return substances, n_substances