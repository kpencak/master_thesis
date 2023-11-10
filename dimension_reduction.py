import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt
import seaborn as sn
from sklearn.decomposition import PCA

# read data
df = pd.read_csv('song.csv', delimiter=',')
print(df.head(4))
emotion = df['emotion']
valence = df['valence']

# drop unnecessary columns
df = df.drop(['emotion','happy','energetic','sad','calm','metadata_arousal','metadata_valence','id', 'name', 'artist', 'genre', 'album', 'release_date', 'valence', 'popularity'], axis=1)
print(df.head(4))

# standarize data
standardized_data = StandardScaler().fit_transform(df)
print(standardized_data.shape)

# tsne
model = TSNE(n_components = 1, random_state = 0)
tsne_data = model.fit_transform(standardized_data)
tsne_data = np.vstack((tsne_data.T, emotion, valence)).T
tsne_df = pd.DataFrame(data = tsne_data, columns = ("Dim_1", "emotion", 'valence'))

print(tsne_df)

sn.scatterplot(data=tsne_df, x='valence', y='Dim_1',
               hue='emotion', palette="bright")
plt.show()

g = sn.FacetGrid(tsne_df, col='emotion', hue='emotion')
g.map(sn.scatterplot, 'valence', 'Dim_1')
plt.show()

pca = PCA(n_components=1)
pca_data = pca.fit_transform(standardized_data)
pca_data = np.vstack((pca_data.T, emotion, valence)).T
pca_df = pd.DataFrame(data = pca_data, columns = ("Dim_1", "emotion", "valence"))
print(pca_df)

sn.scatterplot(data=pca_df, x='valence', y='Dim_1',
               hue='emotion', palette="bright")
plt.show()

pca_df = pca_df.groupby(pca_df["emotion"])

sn.scatterplot(data=pca_df.get_group('calm'), x='Dim_1', y='Dim_2',
               hue='emotion', palette="bright")
sn.scatterplot(data=pca_df.get_group('sad'), x='Dim_1', y='Dim_2',
               hue='emotion', palette="bright")
sn.scatterplot(data=pca_df.get_group('happy'), x='Dim_1', y='Dim_2',
               hue='emotion', palette="bright")
sn.scatterplot(data=pca_df.get_group('energetic'), x='Dim_1', y='Dim_2',
               hue='emotion', palette="bright")

g = sn.FacetGrid(pca_df, col='emotion', hue='emotion')
g.map(sn.scatterplot, 'valence', 'Dim_1')
plt.show()
